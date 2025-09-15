import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, Toaster } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import loginImage from "../assets/dining.jpg";
import { setCredentials } from "../Features/Auth/AuthSlice";
import { Navbar } from "../Components/Navbar";
import { authApi } from "../Features/Apis/AuthApi";
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginUser, { isLoading }] = authApi.useLoginUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const onSubmit = async (data) => {
        const loadingToastId = toast.loading("Logging in...");
        try {
            const res = await loginUser(data).unwrap();
            toast.success("✅ Logged in successfully", { id: loadingToastId });
            dispatch(setCredentials(res));
            // ✅ Corrected conditional navigation
            if (res.role === "Secretary General" || res.role === "Chairman") {
                navigate("/Admindashboard/AllUsers");
            }
            else {
                navigate("/"); // fallback route if needed
            }
        }
        catch (error) {
            const ErrorMessage = error?.data?.error?.error ||
                error?.data?.error ||
                error?.error ||
                "❌ Something went wrong. Please try again.";
            toast.error(`Failed to login: ${ErrorMessage}`, { id: loadingToastId });
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Toaster, { richColors: true, position: "top-right" }), _jsx(Navbar, {}), _jsxs("div", { className: "min-h-screen grid grid-cols-1 md:grid-cols-2 transition-colors duration-300 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100", children: [_jsx("div", { className: "hidden md:block", children: _jsx("img", { src: loginImage, alt: "Login illustration", className: "w-full h-full object-cover" }) }), _jsx("div", { className: "flex items-center bg-base-100 text-secondary justify-center p-6", children: _jsxs("div", { className: "w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl dark:bg-base-100 text-secondary border-2 border-gray-200 dark:border-gray-700 transition-colors", children: [_jsx("h2", { className: "text-3xl font-bold text-center  dark:text-primary mb-6", children: "C.I.S.L.U Login Portal" }), _jsxs("form", { className: "space-y-5", onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1 dark:text-primary", children: "\uD83D\uDCE7 Email" }), _jsx("input", { type: "email", placeholder: "Enter your email", className: "input input-bordered w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100", ...register("email", { required: true }) }), errors.email && (_jsx("span", { className: "text-error text-sm mt-1 block", children: "Email is required." }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1 dark:text-primary", children: "\uD83D\uDD10 Password" }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: showPassword ? "text" : "password", placeholder: "Enter your password", className: "input input-bordered w-full pr-10 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100", ...register("password", { required: true }) }), _jsx("button", { type: "button", "aria-label": showPassword ? "Hide password" : "Show password", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-primary", tabIndex: -1, children: showPassword ? _jsx(EyeOff, { size: 20 }) : _jsx(Eye, { size: 20 }) })] }), errors.password && (_jsx("span", { className: "text-error text-sm mt-1 block", children: "Password is required." }))] }), _jsx("div", { className: "text-right", children: _jsx(Link, { to: "/forgot-password", className: "text-sm text-blue-600 dark:text-blue-400 hover:underline", children: "Forgot password?" }) }), _jsx("button", { type: "submit", className: `btn btn-primary w-full mt-4 text-lg tracking-wide ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`, disabled: isLoading, children: isLoading ? "🚀 Logging in..." : "🎯 Login" })] })] }) })] })] }));
};
export default Login;
