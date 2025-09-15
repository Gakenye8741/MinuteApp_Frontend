import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useGetAllMeetingsQuery, useCreateMeetingMutation, useUpdateMeetingMutation, useDeleteMeetingMutation, } from "../../Features/Apis/meetingApis";
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
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // Open modal for creating
    const openCreateModal = () => {
        setIsEditing(false);
        setFormData({ id: "", title: "", date: "", createdBy: "admin" });
        setIsModalOpen(true);
    };
    // Open modal for editing
    const openEditModal = (meeting) => {
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        let isoDate = null;
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
            }
            else {
                await createMeeting(payload).unwrap();
                Swal.fire("Created!", "Meeting created successfully ✅", "success");
            }
            setIsModalOpen(false);
        }
        catch (err) {
            console.error("Error saving meeting:", err);
            Swal.fire("Error", err?.data?.error || "Failed to save meeting ❌", "error");
        }
    };
    // Handle delete
    const handleDelete = async (id) => {
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
            }
            catch (err) {
                console.error("Error deleting meeting:", err);
                Swal.fire("Error", "Failed to delete meeting ❌", "error");
            }
        }
    };
    if (isLoading)
        return (_jsx("div", { className: "flex justify-center mt-10", children: _jsx(PuffLoader, { size: 60, color: "#2563eb" }) }));
    if (isError)
        return (_jsx("div", { className: "text-red-500 text-center mt-10", children: "Failed to load meetings \u274C" }));
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Manage Meetings" }), _jsx("button", { onClick: openCreateModal, className: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition", children: "+ Create Meeting" })] }), _jsx("div", { className: "grid gap-4", children: meetings?.map((meeting) => (_jsxs("div", { className: "p-4 border rounded-lg shadow flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-lg", children: meeting.title }), _jsx("p", { className: "text-sm text-gray-500", children: new Date(meeting.date).toLocaleDateString() }), _jsxs("p", { className: "text-xs text-gray-400", children: ["Created by: ", meeting.createdBy] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => openEditModal(meeting), className: "bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600", children: "Edit" }), _jsx("button", { onClick: () => handleDelete(meeting.id), className: "bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700", children: "Delete" })] })] }, meeting.id))) }), _jsxs("dialog", { className: `modal ${isModalOpen ? "modal-open" : ""}`, children: [_jsxs("div", { className: "modal-box backdrop-blur-md", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: isEditing ? "Edit Meeting" : "Create Meeting" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx("input", { type: "text", name: "title", placeholder: "Title", value: formData.title, onChange: handleChange, className: "w-full p-2 border rounded", required: true }), _jsx("input", { type: "date", name: "date", value: formData.date, onChange: handleChange, className: "w-full p-2 border rounded", required: true }), _jsx("input", { type: "text", name: "createdBy", placeholder: "Created By", value: formData.createdBy, onChange: handleChange, className: "w-full p-2 border rounded", required: true }), _jsxs("div", { className: "flex justify-end gap-3 mt-4", children: [_jsx("button", { type: "button", onClick: () => setIsModalOpen(false), className: "btn btn-sm bg-gray-400 text-white hover:bg-gray-500", children: "Cancel" }), _jsx("button", { type: "submit", className: "btn btn-sm bg-blue-600 text-white hover:bg-blue-700", children: isEditing ? "Update" : "Create" })] })] })] }), _jsx("form", { method: "dialog", className: "modal-backdrop", children: _jsx("button", { onClick: () => setIsModalOpen(false), children: "close" }) })] })] }));
};
