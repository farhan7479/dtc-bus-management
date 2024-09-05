import React, { useEffect, useState } from "react";
import axios from "axios";

const CrewManagement = () => {
  const [crews, setCrews] = useState([]);
  const [crewName, setCrewName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [editCrewId, setEditCrewId] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    loadCrews();
  }, []);

  // Load all crews
  const loadCrews = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/crews`);
      setCrews(response.data);
    } catch (error) {
      console.error("Error fetching crews:", error);
    }
  };

  // Add a new crew
  const handleAddCrew = async () => {
    try {
      await axios.post(`${API_BASE_URL}/crews`, {
        name: crewName,
        employeeId,
      });
      loadCrews(); // Reload the crews after adding
      setCrewName("");
      setEmployeeId("");
    } catch (error) {
      console.error("Error adding crew:", error);
    }
  };

  // Update an existing crew
  const handleUpdateCrew = async () => {
    try {
      await axios.put(`${API_BASE_URL}/crews/${editCrewId}`, {
        name: crewName,
        employeeId,
      });
      loadCrews(); // Reload the crews after updating
      setEditCrewId(null);
      setCrewName("");
      setEmployeeId("");
    } catch (error) {
      console.error("Error updating crew:", error);
    }
  };

  // Edit a crew (set fields for editing)
  const handleEdit = (crew) => {
    setEditCrewId(crew._id);
    setCrewName(crew.name);
    setEmployeeId(crew.employeeId);
  };

  // Delete a crew
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/crews/${id}`);
      loadCrews(); // Reload the crews after deleting
    } catch (error) {
      console.error("Error deleting crew:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Crew Management</h2>

      <div className="flex flex-col mb-4">
        <input
          type="text"
          placeholder="Crew Name"
          value={crewName}
          onChange={(e) => setCrewName(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="mb-2 p-2 border rounded"
        />

        <button
          onClick={editCrewId ? handleUpdateCrew : handleAddCrew}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {editCrewId ? "Update Crew" : "Add Crew"}
        </button>
      </div>

      <table className="min-w-full ">
        <thead className="bg-gray-500">
          <tr>
            <th className="py-2 px-4">Crew Name</th>
            <th className="py-2 px-4">Employee ID</th>
            <th className="py-2 px-4">On Duty</th>
            <th className="py-2 px-4">Assigned Bus</th>
            <th className="py-2 px-4">Shift Hours</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {crews.map((crew) => (
            <tr key={crew?._id} className="border-b">
              <td className="py-2 px-4">{crew?.name}</td>
              <td className="py-2 px-4">{crew?.employeeId}</td>
              <td className="py-2 px-4">{crew?.isOnDuty ? "Yes" : "No"}</td>
              <td className="py-2 px-4">
                {crew?.assignedBus?.busNumber || "No Bus Assigned"}
              </td>
              <td className="py-2 px-4">{crew?.shiftHours}</td>
              <td className="py-2 px-4 flex space-x-2">
                {/* Edit button */}
                <button
                  onClick={() => handleEdit(crew)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(crew._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
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

export default CrewManagement;
