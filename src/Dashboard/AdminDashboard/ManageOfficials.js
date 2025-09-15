import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useGetAllSignaturesQuery, useAddSignatureMutation, useUpdateSignatureMutation, useDeleteSignatureMutation, } from "../../Features/Apis/SignaturesApi";
import { useGetAllUsersQuery } from "../../Features/Apis/userApi";
import { useGetAllMeetingsQuery } from "../../Features/Apis/meetingApis";
import { useTheme } from "../../ThemeContext"; // Assuming you have a theme context
export default function ManageSignatures() {
    const { theme } = useTheme();
    const { data: signatures, isLoading, isError, refetch } = useGetAllSignaturesQuery();
    const { data: users } = useGetAllUsersQuery({});
    const { data: meetings } = useGetAllMeetingsQuery({});
    const [addSignature] = useAddSignatureMutation();
    const [updateSignature] = useUpdateSignatureMutation();
    const [deleteSignature] = useDeleteSignatureMutation();
    const [openModal, setOpenModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        meetingId: "",
        userId: "",
        signedBy: "",
        role: "",
    });
    // Auto-fill signedBy and role when user is selected (add/edit)
    useEffect(() => {
        if (formData.userId && users) {
            const selectedUser = users.find((u) => u.id === Number(formData.userId));
            if (selectedUser) {
                setFormData((prev) => ({
                    ...prev,
                    signedBy: selectedUser.fullName,
                    role: selectedUser.role,
                }));
            }
        }
    }, [formData.userId, users]);
    const handleSubmit = async (e) => {
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
                        role: formData.role,
                    },
                }).unwrap();
            }
            else {
                await addSignature({
                    meetingId: meetingIdNum,
                    userId: userIdNum,
                    signedBy: formData.signedBy,
                    role: formData.role,
                }).unwrap();
            }
            resetForm();
            refetch();
        }
        catch (error) {
            console.error("Error saving signature:", error);
        }
    };
    const handleEdit = (sig) => {
        setFormData({
            meetingId: sig.meetingId,
            userId: sig.userId || "",
            signedBy: sig.user?.fullName || "",
            role: sig.role || "",
        });
        setEditingId(sig.id);
        setOpenModal(true);
    };
    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this signature?")) {
            try {
                await deleteSignature(id).unwrap();
                refetch();
            }
            catch (error) {
                console.error("Error deleting signature:", error);
            }
        }
    };
    const resetForm = () => {
        setFormData({ meetingId: "", userId: "", signedBy: "", role: "" });
        setEditingId(null);
        setOpenModal(false);
    };
    // Roles already used in the selected meeting, except the one being edited
    const usedRolesForMeeting = signatures
        ?.filter((s) => s.meetingId === Number(formData.meetingId) && s.id !== editingId)
        .map((s) => s.role);
    if (isLoading)
        return _jsx("div", { className: "flex justify-center p-10", children: "Loading..." });
    if (isError)
        return (_jsxs("div", { className: "text-center p-10", style: { color: theme.error }, children: ["Failed to fetch signatures.", _jsx("div", { className: "mt-3", children: _jsx("button", { className: "btn btn-primary", style: { backgroundColor: theme.primary, color: theme["base-100"] }, onClick: () => setOpenModal(true), children: "+ Add First Signature" }) })] }));
    return (_jsxs("div", { className: "p-6", style: { color: theme["base-content"] }, children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Manage Signatures" }), _jsx("button", { className: "btn btn-primary", style: { backgroundColor: theme.primary, color: theme["base-100"] }, onClick: () => {
                            resetForm();
                            setOpenModal(true);
                        }, children: "+ Add Signature" })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "table w-full border", style: { backgroundColor: theme["base-100"], color: theme["base-content"] }, children: [_jsx("thead", { children: _jsx("tr", { children: ["ID", "Meeting", "Signed By", "Role", "Signed At", "Actions"].map((header) => (_jsx("th", { style: { color: theme["base-content"] }, children: header }, header))) }) }), _jsxs("tbody", { children: [signatures?.map((sig, idx) => {
                                    const rowBg = idx % 2 === 0 ? theme["base-200"] : theme["base-300"];
                                    return (_jsxs("tr", { style: {
                                            backgroundColor: rowBg,
                                            color: theme["base-content"],
                                        }, children: [_jsx("td", { children: sig.id }), _jsx("td", { children: sig.meeting?.title || "-" }), _jsx("td", { children: sig.user?.fullName || "-" }), _jsx("td", { style: {
                                                    backgroundColor: theme["base-300"],
                                                    color: theme["base-content"],
                                                }, children: sig.role || "-" }), _jsx("td", { children: sig.signedAt ? new Date(sig.signedAt).toLocaleString() : "-" }), _jsxs("td", { className: "space-x-2", children: [_jsx("button", { className: "btn btn-sm btn-outline", style: { borderColor: theme.primary, color: theme.primary }, onClick: () => handleEdit(sig), children: "Edit" }), _jsx("button", { className: "btn btn-sm", style: {
                                                            backgroundColor: theme.error,
                                                            color: theme["base-100"],
                                                        }, onClick: () => handleDelete(sig.id), children: "Delete" })] })] }, sig.id));
                                }), (!signatures || signatures.length === 0) && (_jsx("tr", { children: _jsxs("td", { colSpan: 6, className: "text-center py-6", children: ["No signatures found.", _jsx("div", { className: "mt-3", children: _jsx("button", { className: "btn btn-primary", style: { backgroundColor: theme.primary, color: theme["base-100"] }, onClick: () => setOpenModal(true), children: "+ Add First Signature" }) })] }) }))] })] }) }), openModal && (_jsxs("dialog", { open: true, className: "modal modal-open fixed inset-0 flex items-center justify-center z-50", style: { backgroundColor: "transparent" }, children: [_jsx("div", { className: "absolute inset-0 bg-black/30 backdrop-blur-sm", onClick: resetForm }), _jsxs("form", { onSubmit: handleSubmit, className: "modal-box relative max-w-md w-full p-6 rounded-lg shadow-xl", style: {
                            backgroundColor: theme["base-100"] + "cc",
                            color: theme["base-content"],
                            backdropFilter: "blur(10px)",
                        }, children: [_jsx("h3", { className: "font-bold text-lg mb-4", children: editingId ? "Edit Signature" : "Add Signature" }), _jsxs("div", { className: "form-control gap-3", children: [!editingId && (_jsxs("select", { className: "select select-bordered w-full", value: formData.meetingId, onChange: (e) => setFormData({ ...formData, meetingId: e.target.value }), required: true, style: {
                                            backgroundColor: theme["base-200"],
                                            color: theme["base-content"],
                                            borderColor: theme.primary,
                                        }, children: [_jsx("option", { value: "", children: "Select Meeting" }), meetings?.map((m) => (_jsx("option", { value: m.id, children: m.title }, m.id)))] })), _jsxs("select", { className: "select select-bordered w-full", value: formData.userId, onChange: (e) => setFormData({ ...formData, userId: e.target.value }), required: true, style: {
                                            backgroundColor: theme["base-200"],
                                            color: theme["base-content"],
                                            borderColor: theme.primary,
                                        }, children: [_jsx("option", { value: "", children: "Select User" }), users
                                                ?.filter((u) => u.isActive)
                                                .map((u) => (_jsxs("option", { value: u.id, children: [u.fullName, " (", u.role, ")"] }, u.id)))] }), _jsxs("select", { className: "select select-bordered w-full", value: formData.role, onChange: (e) => setFormData({ ...formData, role: e.target.value }), required: true, style: {
                                            backgroundColor: theme["base-200"],
                                            color: theme["base-content"],
                                            borderColor: theme.primary,
                                        }, children: [_jsx("option", { value: "", children: "Select Role" }), _jsx("option", { value: "Secretary General", disabled: usedRolesForMeeting?.includes("Secretary General"), children: "Secretary General" }), _jsx("option", { value: "Chairman", disabled: usedRolesForMeeting?.includes("Chairman"), children: "Chairman" })] })] }), _jsxs("div", { className: "modal-action mt-4 flex justify-end gap-2", children: [_jsx("button", { type: "submit", className: "btn btn-primary", style: { backgroundColor: theme.primary, color: theme["base-100"] }, children: editingId ? "Update" : "Add" }), _jsx("button", { type: "button", className: "btn", style: {
                                            backgroundColor: theme["base-200"],
                                            color: theme["base-content"],
                                        }, onClick: resetForm, children: "Cancel" })] })] })] }))] }));
}
