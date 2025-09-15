import { useState, useEffect } from "react";
import {
  useGetAllSignaturesQuery,
  useAddSignatureMutation,
  useUpdateSignatureMutation,
  useDeleteSignatureMutation,
} from "../../Features/Apis/SignaturesApi";
import { useGetAllUsersQuery } from "../../Features/Apis/userApi";
import { useGetAllMeetingsQuery } from "../../Features/Apis/meetingApis";
import { useTheme } from "../../ThemeContext";

export default function AllSignatures() {
  const { theme } = useTheme();
  const { data: signatures, isLoading, isError, refetch } = useGetAllSignaturesQuery();
  const { data: users } = useGetAllUsersQuery({});
  const { data: meetings } = useGetAllMeetingsQuery({});

  const [addSignature] = useAddSignatureMutation();
  const [updateSignature] = useUpdateSignatureMutation();
  const [deleteSignature] = useDeleteSignatureMutation();

  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    meetingId: "",
    userId: "",
    signedBy: "",
    role: "",
  });

  // Auto-fill signedBy and role when user is selected
  useEffect(() => {
    if (formData.userId && users) {
      const selectedUser = users.find((u: any) => u.id === Number(formData.userId));
      if (selectedUser) {
        setFormData((prev) => ({
          ...prev,
          signedBy: selectedUser.fullName,
          role: selectedUser.role,
        }));
      }
    }
  }, [formData.userId, users]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const meetingIdNum = Number(formData.meetingId);
    const userIdNum = Number(formData.userId);

    if (!meetingIdNum || !userIdNum || !formData.role || !formData.signedBy) {
      alert("Please select a meeting, a user, and a role.");
      return;
    }

    try {
      if (editingId) {
        await updateSignature({
          id: editingId,
          updates: {
            userId: userIdNum,
            signedBy: formData.signedBy,
            role: formData.role as "Secretary General" | "Chairman",
          },
        }).unwrap();
      } else {
        await addSignature({
          meetingId: meetingIdNum,
          userId: userIdNum,
          signedBy: formData.signedBy,
          role: formData.role as "Secretary General" | "Chairman",
        }).unwrap();
      }
      resetForm();
      refetch();
    } catch (error) {
      console.error("Error saving signature:", error);
    }
  };

  const handleEdit = (sig: any) => {
    setFormData({
      meetingId: sig.meetingId,
      userId: sig.userId || "",
      signedBy: sig.user?.fullName || "",
      role: sig.role || "",
    });
    setEditingId(sig.id);
    setOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this signature?")) {
      try {
        await deleteSignature(id).unwrap();
        refetch();
      } catch (error) {
        console.error("Error deleting signature:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ meetingId: "", userId: "", signedBy: "", role: "" });
    setEditingId(null);
    setOpenModal(false);
  };

  // Roles already used in the selected meeting
  const usedRolesForMeeting = signatures
    ?.filter((s) => s.meetingId === Number(formData.meetingId) && s.id !== editingId)
    .map((s) => s.role);

  if (isLoading)
    return <div className="flex justify-center p-10">Loading...</div>;

  if (isError)
    return (
      <div className="text-center p-10" style={{ color: theme.error }}>
        Failed to fetch signatures.
        <div className="mt-3">
          <button
            className="btn btn-primary"
            style={{ backgroundColor: theme.primary, color: theme["base-100"] }}
            onClick={() => setOpenModal(true)}
          >
            + Add First Signature
          </button>
        </div>
      </div>
    );

  return (
    <div className="p-6" style={{ color: theme["base-content"] }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Signatures</h2>
        <button
          className="btn btn-primary"
          style={{ backgroundColor: theme.primary, color: theme["base-100"] }}
          onClick={() => {
            resetForm();
            setOpenModal(true);
          }}
        >
          + Add Signature
        </button>
      </div>

      {/* Signatures Table */}
      <div className="overflow-x-auto">
        <table
          className="table w-full border"
          style={{ backgroundColor: theme["base-100"], color: theme["base-content"] }}
        >
          <thead>
            <tr>
              {["ID", "Meeting", "Signed By", "Role", "Signed At", "Actions"].map(
                (header) => (
                  <th key={header} style={{ color: theme["base-content"] }}>
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {signatures?.map((sig: any, idx: number) => {
              const rowBg = idx % 2 === 0 ? theme["base-200"] : theme["base-300"];
              return (
                <tr
                  key={sig.id}
                  style={{
                    backgroundColor: rowBg,
                    color: theme["base-content"],
                  }}
                >
                  <td>{sig.id}</td>
                  <td>{sig.meeting?.title || "-"}</td>
                  <td>{sig.user?.fullName || "-"}</td>
                  {/* Role column dark background for contrast */}
                  <td
                    style={{
                      backgroundColor: theme["base-300"],
                      color: theme["base-content"],
                    }}
                  >
                    {sig.role || "-"}
                  </td>
                  <td>{sig.signedAt ? new Date(sig.signedAt).toLocaleString() : "-"}</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm btn-outline"
                      style={{ borderColor: theme.primary, color: theme.primary }}
                      onClick={() => handleEdit(sig)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm"
                      style={{ backgroundColor: theme.error, color: theme["base-100"] }}
                      onClick={() => handleDelete(sig.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {(!signatures || signatures.length === 0) && (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  No signatures found.
                  <div className="mt-3">
                    <button
                      className="btn btn-primary"
                      style={{ backgroundColor: theme.primary, color: theme["base-100"] }}
                      onClick={() => setOpenModal(true)}
                    >
                      + Add First Signature
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
        <dialog
          open
          className="modal modal-open fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "transparent" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={resetForm}
          ></div>

          {/* Modal content */}
          <form
            onSubmit={handleSubmit}
            className="modal-box relative max-w-md w-full p-6 rounded-lg shadow-xl"
            style={{
              backgroundColor: theme["base-100"] + "cc",
              color: theme["base-content"],
              backdropFilter: "blur(10px)",
            }}
          >
            <h3 className="font-bold text-lg mb-4">
              {editingId ? "Edit Signature" : "Add Signature"}
            </h3>
            <div className="form-control gap-3">
              {!editingId && (
                <select
                  className="select select-bordered w-full"
                  value={formData.meetingId}
                  onChange={(e) =>
                    setFormData({ ...formData, meetingId: e.target.value })
                  }
                  required
                  style={{
                    backgroundColor: theme["base-200"],
                    color: theme["base-content"],
                    borderColor: theme.primary,
                  }}
                >
                  <option value="">Select Meeting</option>
                  {meetings?.map((m: any) => (
                    <option key={m.id} value={m.id}>
                      {m.title}
                    </option>
                  ))}
                </select>
              )}

              <select
                className="select select-bordered w-full"
                value={formData.userId}
                onChange={(e) =>
                  setFormData({ ...formData, userId: e.target.value })
                }
                required
                style={{
                  backgroundColor: theme["base-200"],
                  color: theme["base-content"],
                  borderColor: theme.primary,
                }}
              >
                <option value="">Select User</option>
                {users
                  ?.filter((u: any) => u.isActive)
                  .map((u: any) => (
                    <option key={u.id} value={u.id}>
                      {u.fullName} ({u.role})
                    </option>
                  ))}
              </select>

              <select
                className="select select-bordered w-full"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                required
                style={{
                  backgroundColor: theme["base-200"],
                  color: theme["base-content"],
                  borderColor: theme.primary,
                }}
              >
                <option value="">Select Role</option>
                <option
                  value="Secretary General"
                  disabled={usedRolesForMeeting?.includes("Secretary General")}
                >
                  Secretary General
                </option>
                <option
                  value="Chairman"
                  disabled={usedRolesForMeeting?.includes("Chairman")}
                >
                  Chairman
                </option>
              </select>
            </div>

            <div className="modal-action mt-4 flex justify-end gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ backgroundColor: theme.primary, color: theme["base-100"] }}
              >
                {editingId ? "Update" : "Add"}
              </button>
              <button
                type="button"
                className="btn"
                style={{
                  backgroundColor: theme["base-200"],
                  color: theme["base-content"],
                }}
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
}
