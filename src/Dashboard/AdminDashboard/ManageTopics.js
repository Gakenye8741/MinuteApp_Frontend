import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/Pages/ManageTopics.tsx
import { useEffect, useState } from "react";
import axios from "axios";
const ManageTopics = () => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({});
    const [editingId, setEditingId] = useState(null);
    const API_URL = "http://localhost:5000/api/Topics";
    // Fetch topics
    const fetchTopics = async () => {
        try {
            const res = await axios.get(`${API_URL}/AllTopics`);
            setTopics(res.data);
        }
        catch (err) {
            console.error("Error fetching topics", err);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTopics();
    }, []);
    // Handle input change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    // Add or update topic
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${API_URL}/UpdateTopic/${editingId}`, form);
            }
            else {
                await axios.post(`${API_URL}/AddTopic`, form);
            }
            setForm({});
            setEditingId(null);
            fetchTopics();
        }
        catch (err) {
            console.error("Error saving topic", err);
        }
    };
    // Delete topic
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/DeleteTopic/${id}`);
            fetchTopics();
        }
        catch (err) {
            console.error("Error deleting topic", err);
        }
    };
    // Edit topic
    const handleEdit = (topic) => {
        setForm(topic);
        setEditingId(topic.id);
    };
    return (_jsxs("div", { className: "p-6 max-w-4xl mx-auto", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Manage Topics" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-3 border p-4 rounded shadow mb-6", children: [_jsx("input", { type: "number", name: "meetingId", value: form.meetingId ?? "", onChange: handleChange, placeholder: "Meeting ID", className: "border px-2 py-1 rounded w-full", required: true }), _jsx("input", { type: "text", name: "subject", value: form.subject ?? "", onChange: handleChange, placeholder: "Subject", className: "border px-2 py-1 rounded w-full", required: true }), _jsx("textarea", { name: "notes", value: form.notes ?? "", onChange: handleChange, placeholder: "Notes", className: "border px-2 py-1 rounded w-full" }), _jsx("textarea", { name: "decisions", value: form.decisions ?? "", onChange: handleChange, placeholder: "Decisions", className: "border px-2 py-1 rounded w-full" }), _jsx("textarea", { name: "actions", value: form.actions ?? "", onChange: handleChange, placeholder: "Actions", className: "border px-2 py-1 rounded w-full" }), _jsx("button", { type: "submit", className: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700", children: editingId ? "Update Topic" : "Add Topic" })] }), loading ? (_jsx("p", { children: "Loading topics..." })) : topics.length === 0 ? (_jsx("p", { children: "No topics found" })) : (_jsxs("table", { className: "w-full border", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-200", children: [_jsx("th", { className: "border px-2 py-1", children: "ID" }), _jsx("th", { className: "border px-2 py-1", children: "Meeting ID" }), _jsx("th", { className: "border px-2 py-1", children: "Subject" }), _jsx("th", { className: "border px-2 py-1", children: "Notes" }), _jsx("th", { className: "border px-2 py-1", children: "Decisions" }), _jsx("th", { className: "border px-2 py-1", children: "Actions" }), _jsx("th", { className: "border px-2 py-1", children: "Manage" })] }) }), _jsx("tbody", { children: topics.map((topic) => (_jsxs("tr", { children: [_jsx("td", { className: "border px-2 py-1", children: topic.id }), _jsx("td", { className: "border px-2 py-1", children: topic.meetingId }), _jsx("td", { className: "border px-2 py-1", children: topic.subject }), _jsx("td", { className: "border px-2 py-1", children: topic.notes }), _jsx("td", { className: "border px-2 py-1", children: topic.decisions }), _jsx("td", { className: "border px-2 py-1", children: topic.actions }), _jsxs("td", { className: "border px-2 py-1 space-x-2", children: [_jsx("button", { onClick: () => handleEdit(topic), className: "bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600", children: "Edit" }), _jsx("button", { onClick: () => handleDelete(topic.id), className: "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600", children: "Delete" })] })] }, topic.id))) })] }))] }));
};
export default ManageTopics;
