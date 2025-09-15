import { useState } from "react";
import {
  useGetAllMeetingsQuery,
  useCreateMeetingMutation,
  useUpdateMeetingMutation,
  useDeleteMeetingMutation,
} from "../../Features/Apis/meetingApis";
import { PuffLoader } from "react-spinners";
import Swal from "sweetalert2"; // ✅ SweetAlert2
import "sweetalert2/dist/sweetalert2.min.css"; // style for swal

export const ManageMeetings = () => {
  const { data: meetings, isLoading, isError } = useGetAllMeetingsQuery({});
  const [createMeeting] = useCreateMeetingMutation();
  const [updateMeeting] = useUpdateMeetingMutation();
  const [deleteMeeting] = useDeleteMeetingMutation();

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    date: "",
    createdBy: "admin", // hardcoded for now
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open modal for creating
  const openCreateModal = () => {
    setIsEditing(false);
    setFormData({ id: "", title: "", date: "", createdBy: "admin" });
    setIsModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (meeting: any) => {
    setIsEditing(true);
    setFormData({
      id: meeting.id,
      title: meeting.title,
      date: meeting.date ? new Date(meeting.date).toISOString().split("T")[0] : "",
      createdBy: meeting.createdBy || "admin",
    });
    setIsModalOpen(true);
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isoDate: string | null = null;
    if (formData.date) {
      const dateObj = new Date(`${formData.date}T00:00:00`);
      isoDate = dateObj.toISOString();
    }

    const payload = {
      title: formData.title,
      date: isoDate,
      createdBy: formData.createdBy,
    };

    try {
      if (isEditing) {
        await updateMeeting({ id: formData.id, ...payload }).unwrap();
        Swal.fire("Updated!", "Meeting updated successfully ✅", "success");
      } else {
        await createMeeting(payload).unwrap();
        Swal.fire("Created!", "Meeting created successfully ✅", "success");
      }
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Error saving meeting:", err);
      Swal.fire("Error", err?.data?.error || "Failed to save meeting ❌", "error");
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This meeting will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteMeeting(id).unwrap();
        Swal.fire("Deleted!", "Meeting deleted ✅", "success");
      } catch (err) {
        console.error("Error deleting meeting:", err);
        Swal.fire("Error", "Failed to delete meeting ❌", "error");
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-10">
        <PuffLoader size={60} color="#2563eb" />
      </div>
    );
  if (isError)
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load meetings ❌
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Meetings</h2>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Create Meeting
        </button>
      </div>

      {/* Meeting List */}
      <div className="grid gap-4">
        {meetings?.map((meeting: any) => (
          <div
            key={meeting.id}
            className="p-4 border rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{meeting.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(meeting.date).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-400">
                Created by: {meeting.createdBy}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openEditModal(meeting)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(meeting.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DaisyUI Modal */}
      <dialog className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box backdrop-blur-md">
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? "Edit Meeting" : "Create Meeting"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="createdBy"
              placeholder="Created By"
              value={formData.createdBy}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn btn-sm bg-gray-400 text-white hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700"
              >
                {isEditing ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setIsModalOpen(false)}>close</button>
        </form>
      </dialog>
    </div>
  );
};
