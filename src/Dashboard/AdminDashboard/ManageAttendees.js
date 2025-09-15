import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useGetAllAttendeesQuery, useAddAttendeeMutation, useUpdateAttendeeMutation, useDeleteAttendeeMutation, } from "../../Features/Apis/AttendeesApi";
const ManageAttendees = ({ meetingId }) => {
    const { data: attendees, isLoading, isError, refetch } = useGetAllAttendeesQuery(meetingId);
    const [addAttendee] = useAddAttendeeMutation();
    const [updateAttendee] = useUpdateAttendeeMutation();
    const [deleteAttendee] = useDeleteAttendeeMutation();
    const [form, setForm] = useState({
        meetingId,
        name: "",
        email: "",
        status: "Present",
    });
    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleAdd = async () => {
        if (!form.meetingId || !form.name || !form.status)
            return alert("Meeting ID, Name, and Status are required");
        try {
            await addAttendee(form).unwrap();
            setForm({ ...form, name: "", email: "", status: "Present" });
            refetch();
        }
        catch (err) {
            console.error(err);
        }
    };
    const handleUpdate = async (id, updatedData) => {
        try {
            await updateAttendee({ id, ...updatedData }).unwrap();
            refetch();
        }
        catch (err) {
            console.error(err);
        }
    };
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this attendee?"))
            return;
        try {
            await deleteAttendee(id.toString()).unwrap();
            refetch();
        }
        catch (err) {
            console.error(err);
        }
    };
    if (isLoading)
        return _jsx("p", { children: "Loading attendees..." });
    if (isError)
        return _jsx("p", { children: "Error loading attendees" });
    return (_jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Manage Attendees" }), _jsxs("div", { className: "mb-6 border p-4 rounded shadow", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Add Attendee" }), _jsx("input", { type: "text", name: "meetingId", placeholder: "Meeting ID", value: form.meetingId, onChange: handleInputChange, className: "border p-2 mr-2 rounded w-24" }), _jsx("input", { type: "text", name: "name", placeholder: "Name", value: form.name, onChange: handleInputChange, className: "border p-2 mr-2 rounded" }), _jsx("input", { type: "email", name: "email", placeholder: "Email (optional)", value: form.email, onChange: handleInputChange, className: "border p-2 mr-2 rounded" }), _jsxs("select", { name: "status", value: form.status, onChange: handleInputChange, className: "border p-2 mr-2 rounded", children: [_jsx("option", { value: "Present", children: "Present" }), _jsx("option", { value: "Absent", children: "Absent" }), _jsx("option", { value: "Late", children: "Late" })] }), _jsx("button", { onClick: handleAdd, className: "bg-blue-500 text-white px-4 py-2 rounded", children: "Add" })] }), _jsxs("table", { className: "w-full border-collapse border", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "border p-2", children: "Meeting ID" }), _jsx("th", { className: "border p-2", children: "Name" }), _jsx("th", { className: "border p-2", children: "Email" }), _jsx("th", { className: "border p-2", children: "Status" }), _jsx("th", { className: "border p-2", children: "Actions" })] }) }), _jsx("tbody", { children: attendees?.map((attendee) => (_jsxs("tr", { children: [_jsx("td", { className: "border p-2", children: _jsx("input", { type: "text", defaultValue: attendee.meetingId, onBlur: (e) => handleUpdate(attendee.id, { meetingId: e.target.value }), className: "border p-1 rounded w-20" }) }), _jsx("td", { className: "border p-2", children: _jsx("input", { type: "text", defaultValue: attendee.name, onBlur: (e) => handleUpdate(attendee.id, { name: e.target.value }), className: "border p-1 rounded w-full" }) }), _jsx("td", { className: "border p-2", children: _jsx("input", { type: "email", defaultValue: attendee.email || "", onBlur: (e) => handleUpdate(attendee.id, { email: e.target.value }), className: "border p-1 rounded w-full" }) }), _jsx("td", { className: "border p-2", children: _jsxs("select", { value: attendee.status, onChange: (e) => handleUpdate(attendee.id, { status: e.target.value }), className: "border p-1 rounded", children: [_jsx("option", { value: "Present", children: "Present" }), _jsx("option", { value: "Absent", children: "Absent" }), _jsx("option", { value: "Late", children: "Late" })] }) }), _jsx("td", { className: "border p-2 space-x-2", children: _jsx("button", { onClick: () => handleDelete(attendee.id), className: "bg-red-500 text-white px-2 py-1 rounded", children: "Delete" }) })] }, attendee.id))) })] })] }));
};
export default ManageAttendees;
