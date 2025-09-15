import { useState, useEffect } from "react";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../Features/Apis/userApi";
import { useRegisterUserMutation } from "../../Features/Apis/AuthApi";

export default function ManageOfficials() {
  const { data: users, isLoading, isError, refetch } = useGetAllUsersQuery({});
  const [registerUser] = useRegisterUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<{
    username: string;
    fullName: string;
    email: string;
    password: string;
    role: "Secretary General" | "Chairman";
  }>({
    username: "",
    fullName: "",
    email: "",
    password: "",
    role: "Secretary General",
  });

  // Optional effect for any custom logic
  useEffect(() => {}, [formData.fullName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, fullName, email, password, role } = formData;

    if (!fullName || !username || !email || (!password && !editingId) || !role) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      if (editingId) {
        await updateUser({
          id: editingId,
          fullName,
          role,
        }).unwrap();
      } else {
        await registerUser({ username, fullName, email, password, role }).unwrap();
      }
      resetForm();
      refetch(); // Refresh table
    } catch (error) {
      console.error("Error saving official:", error);
    }
  };

  const handleEdit = (user: any) => {
    setFormData({
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      password: "",
      role: user.role,
    });
    setEditingId(user.id);
    setOpenModal(true);
  };

  const handleToggleStatus = async (user: any) => {
    try {
      await updateUser({
        id: user.id,
        isActive: !user.isActive, // Toggle status
      }).unwrap();
      refetch();
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      fullName: "",
      email: "",
      password: "",
      role: "Secretary General",
    });
    setEditingId(null);
    setOpenModal(false);
  };

  const officials = users?.filter(
    (u: any) => u.role === "Secretary General" || u.role === "Chairman"
  );

  if (isLoading) return <div className="flex justify-center p-10">Loading...</div>;

  if (isError)
    return (
      <div className="text-red-500 text-center p-10">
        Failed to fetch officials.
        <div className="mt-3">
          <button className="btn btn-primary" onClick={() => setOpenModal(true)}>
            + Add Official
          </button>
        </div>
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Officials</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setOpenModal(true);
          }}
        >
          + Add Official
        </button>
      </div>

      {/* Officials Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {officials?.map((user: any) => (
              <tr key={user.id} className={!user.isActive ? "opacity-50" : ""}>
                <td>{user.id}</td>
                <td>{user.fullName}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.isActive ? "Enabled" : "Disabled"}</td>
                <td className="space-x-2">
                  <button className="btn btn-sm btn-outline" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                  <button
                    className={`btn btn-sm ${user.isActive ? "btn-error" : "btn-success"}`}
                    onClick={() => handleToggleStatus(user)}
                  >
                    {user.isActive ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
            {(!officials || officials.length === 0) && (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-6">
                  No officials found.
                  <div className="mt-3">
                    <button className="btn btn-primary" onClick={() => setOpenModal(true)}>
                      + Add Official
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {openModal && (
        <dialog open className="modal modal-open">
          <form onSubmit={handleSubmit} className="modal-box max-w-md">
            <h3 className="font-bold text-lg mb-4">
              {editingId ? "Edit Official" : "Add Official"}
            </h3>
            <div className="form-control gap-3">
              {!editingId && (
                <>
                  <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered w-full"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </>
              )}
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
              <select
                className="select select-bordered w-full"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value as "Secretary General" | "Chairman" })
                }
              >
                <option value="Secretary General">Secretary General</option>
                <option value="Chairman">Chairman</option>
              </select>
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                {editingId ? "Update" : "Add"}
              </button>
              <button type="button" className="btn" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
}
