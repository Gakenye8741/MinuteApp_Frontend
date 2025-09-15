// src/Pages/ManageTopics.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Topic {
  id: number;
  meetingId: number;
  subject: string;
  notes?: string;
  decisions?: string;
  actions?: string;
}

const ManageTopics: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Topic>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  const API_URL = "http://localhost:5000/api/Topics";

  // Fetch topics
  const fetchTopics = async () => {
    try {
      const res = await axios.get(`${API_URL}/AllTopics`);
      setTopics(res.data);
    } catch (err) {
      console.error("Error fetching topics", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update topic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/UpdateTopic/${editingId}`, form);
      } else {
        await axios.post(`${API_URL}/AddTopic`, form);
      }
      setForm({});
      setEditingId(null);
      fetchTopics();
    } catch (err) {
      console.error("Error saving topic", err);
    }
  };

  // Delete topic
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/DeleteTopic/${id}`);
      fetchTopics();
    } catch (err) {
      console.error("Error deleting topic", err);
    }
  };

  // Edit topic
  const handleEdit = (topic: Topic) => {
    setForm(topic);
    setEditingId(topic.id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Topics</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded shadow mb-6">
        <input
          type="number"
          name="meetingId"
          value={form.meetingId ?? ""}
          onChange={handleChange}
          placeholder="Meeting ID"
          className="border px-2 py-1 rounded w-full"
          required
        />
        <input
          type="text"
          name="subject"
          value={form.subject ?? ""}
          onChange={handleChange}
          placeholder="Subject"
          className="border px-2 py-1 rounded w-full"
          required
        />
        <textarea
          name="notes"
          value={form.notes ?? ""}
          onChange={handleChange}
          placeholder="Notes"
          className="border px-2 py-1 rounded w-full"
        />
        <textarea
          name="decisions"
          value={form.decisions ?? ""}
          onChange={handleChange}
          placeholder="Decisions"
          className="border px-2 py-1 rounded w-full"
        />
        <textarea
          name="actions"
          value={form.actions ?? ""}
          onChange={handleChange}
          placeholder="Actions"
          className="border px-2 py-1 rounded w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update Topic" : "Add Topic"}
        </button>
      </form>

      {/* Topics Table */}
      {loading ? (
        <p>Loading topics...</p>
      ) : topics.length === 0 ? (
        <p>No topics found</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Meeting ID</th>
              <th className="border px-2 py-1">Subject</th>
              <th className="border px-2 py-1">Notes</th>
              <th className="border px-2 py-1">Decisions</th>
              <th className="border px-2 py-1">Actions</th>
              <th className="border px-2 py-1">Manage</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((topic) => (
              <tr key={topic.id}>
                <td className="border px-2 py-1">{topic.id}</td>
                <td className="border px-2 py-1">{topic.meetingId}</td>
                <td className="border px-2 py-1">{topic.subject}</td>
                <td className="border px-2 py-1">{topic.notes}</td>
                <td className="border px-2 py-1">{topic.decisions}</td>
                <td className="border px-2 py-1">{topic.actions}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button
                    onClick={() => handleEdit(topic)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(topic.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageTopics;
