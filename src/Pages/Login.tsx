import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, Toaster } from "sonner";
import { Eye, EyeOff } from "lucide-react";

import loginImage from "../assets/dining.jpg";
import { setCredentials } from "../Features/Auth/AuthSlice";
import { Navbar } from "../Components/Navbar";
import { authApi } from "../Features/Apis/AuthApi";

interface LoginDetails {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginDetails>();
  const [loginUser, { isLoading }] = authApi.useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginDetails) => {
  const loadingToastId = toast.loading("Logging in...");
  try {
    const res = await loginUser(data).unwrap();
    toast.success("✅ Logged in successfully", { id: loadingToastId });
    dispatch(setCredentials(res));

    // ✅ Corrected conditional navigation
    if (res.role === "Secretary General" || res.role === "Chairman") {
      navigate("/Admindashboard/AllUsers");
    } else {
      navigate("/"); // fallback route if needed
    }

  } catch (error: any) {
    const ErrorMessage =
      error?.data?.error?.error ||
      error?.data?.error ||
      error?.error ||
      "❌ Something went wrong. Please try again.";
    toast.error(`Failed to login: ${ErrorMessage}`, { id: loadingToastId });
  }
};


  return (
    <>
      <Toaster richColors position="top-right" />
      <Navbar />
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 transition-colors duration-300 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

        {/* Image Side */}
        <div className="hidden md:block">
          <img
            src={loginImage}
            alt="Login illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Side */}
        <div className="flex items-center bg-base-100 text-secondary justify-center p-6">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl dark:bg-base-100 text-secondary border-2 border-gray-200 dark:border-gray-700 transition-colors">
            
            <h2 className="text-3xl font-bold text-center  dark:text-primary mb-6">
              C.I.S.L.U Login Portal
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-primary">
                  📧 Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-error text-sm mt-1 block">
                    Email is required.
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-primary">
                  🔐 Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="input input-bordered w-full pr-10 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    {...register("password", { required: true })}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-primary"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-error text-sm mt-1 block">
                    Password is required.
                  </span>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`btn btn-primary w-full mt-4 text-lg tracking-wide ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "🚀 Logging in..." : "🎯 Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
