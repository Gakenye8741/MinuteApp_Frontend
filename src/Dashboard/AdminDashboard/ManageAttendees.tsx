import React, { useState } from "react";
import {
  useGetAllAttendeesQuery,
  useAddAttendeeMutation,
  useUpdateAttendeeMutation,
  useDeleteAttendeeMutation,
} from "../../Features/Apis/AttendeesApi";

interface AttendeeForm {
  meetingId: string;
  name: string;
  email?: string;
  status: "Present" | "Absent" | "Late";
}

const ManageAttendees = ({ meetingId }: { meetingId: string }) => {
  const { data: attendees, isLoading, isError, refetch } = useGetAllAttendeesQuery(meetingId);
  const [addAttendee] = useAddAttendeeMutation();
  const [updateAttendee] = useUpdateAttendeeMutation();
  const [deleteAttendee] = useDeleteAttendeeMutation();

  const [form, setForm] = useState<AttendeeForm>({
    meetingId,
    name: "",
    email: "",
    status: "Present",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (!form.meetingId || !form.name || !form.status) return alert("Meeting ID, Name, and Status are required");
    try {
      await addAttendee(form).unwrap();
      setForm({ ...form, name: "", email: "", status: "Present" });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id: number, updatedData: Partial<AttendeeForm>) => {
    try {
      await updateAttendee({ id, ...updatedData }).unwrap();
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this attendee?")) return;
    try {
      await deleteAttendee(id.toString()).unwrap();
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <p>Loading attendees...</p>;
  if (isError) return <p>Error loading attendees</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Attendees</h2>

      {/* Add Attendee Form */}
      <div className="mb-6 border p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Add Attendee</h3>
        <input
          type="text"
          name="meetingId"
          placeholder="Meeting ID"
          value={form.meetingId}
          onChange={handleInputChange}
          className="border p-2 mr-2 rounded w-24"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleInputChange}
          className="border p-2 mr-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          value={form.email}
          onChange={handleInputChange}
          className="border p-2 mr-2 rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleInputChange}
          className="border p-2 mr-2 rounded"
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
        </select>
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      {/* Attendees List */}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Meeting ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendees?.map((attendee:any) => (
            <tr key={attendee.id}>
              <td className="border p-2">
                <input
                  type="text"
                  defaultValue={attendee.meetingId}
                  onBlur={(e) => handleUpdate(attendee.id, { meetingId: e.target.value })}
                  className="border p-1 rounded w-20"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  defaultValue={attendee.name}
                  onBlur={(e) => handleUpdate(attendee.id, { name: e.target.value })}
                  className="border p-1 rounded w-full"
                />
              </td>
              <td className="border p-2">
                <input
                  type="email"
                  defaultValue={attendee.email || ""}
                  onBlur={(e) => handleUpdate(attendee.id, { email: e.target.value })}
                  className="border p-1 rounded w-full"
                />
              </td>
              <td className="border p-2">
                <select
                  value={attendee.status}
                  onChange={(e) => handleUpdate(attendee.id, { status: e.target.value as any })}
                  className="border p-1 rounded"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                </select>
              </td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleDelete(attendee.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAttendees;
