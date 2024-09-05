import React, { useEffect, useState } from "react";
import axios from "axios";

const DutyManagement = () => {
  const [duties, setDuties] = useState([]);
  const [dutyName, setDutyName] = useState("");
  const [dutyDetails, setDutyDetails] = useState("");
  const [busId, setBusId] = useState("");
  const [crewId, setCrewId] = useState("");
  const [dutyType, setDutyType] = useState("linked");
  const [startDate, setStartDate] = useState(""); // Separate date and time
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState(""); // Separate date and time
  const [endTime, setEndTime] = useState("");
  const [restPeriod, setRestPeriod] = useState(0);
  const [buses, setBuses] = useState([]);
  const [crews, setCrews] = useState([]);
  const [editDutyId, setEditDutyId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    loadDuties();
    loadBuses();
    loadCrews();
  }, []);

  // Load all duties
  const loadDuties = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/duties`);
      setDuties(response.data);
    } catch (error) {
      console.error("Error fetching duties:", error);
    }
  };

  // Load all buses
  const loadBuses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/buses`);
      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  // Load all crews
  const loadCrews = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/crews`);
      setCrews(response.data);
    } catch (error) {
      console.error("Error fetching crews:", error);
    }
  };

  // Format date and time as ISO string
  const formatDateTimeToISO = (date, time) => {
    if (!date || !time) return "";
    const [hours, minutes] = time.split(":").map(Number);
    const [year, month, day] = date.split("-").map(Number);
    const formattedDate = new Date(year, month - 1, day, hours, minutes);
    return formattedDate.toISOString();
  };

  // Add a new duty
  const handleAddDuty = async () => {
    try {
      await axios.post(`${API_BASE_URL}/duties`, {
        name: dutyName,
        busId,
        crewId,
        dutyType,
        startTime: formatDateTimeToISO(startDate, startTime),
        endTime: formatDateTimeToISO(endDate, endTime),
        restPeriod,
      });
      loadDuties(); // Reload the duties after adding
      setDutyName("");
      setDutyDetails("");
      setBusId("");
      setCrewId("");
      setDutyType("linked");
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
      setRestPeriod(0);
    } catch (error) {
      console.error("Error adding duty:", error);
    }
  };

  // Update an existing duty
  const handleUpdateDuty = async () => {
    try {
      await axios.put(`${API_BASE_URL}/duties/${editDutyId}`, {
        name: dutyName,
        bus: busId,
        crew: crewId,
        dutyType,
        startTime: formatDateTimeToISO(startDate, startTime),
        endTime: formatDateTimeToISO(endDate, endTime),
        restPeriod,
      });
      loadDuties(); // Reload the duties after updating
      setEditDutyId(null);
      setDutyName("");
      setDutyDetails("");
      setBusId("");
      setCrewId("");
      setDutyType("linked");
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
      setRestPeriod(0);
    } catch (error) {
      console.error("Error updating duty:", error);
    }
  };

  // Edit a duty (set fields for editing)
  const handleEdit = (duty) => {
    setEditDutyId(duty._id);
    setDutyName(duty.name);
    setDutyDetails(duty.details);
    setBusId(duty.bus);
    setCrewId(duty.crew);
    setDutyType(duty.dutyType);
    const startDateTime = new Date(duty.startTime);
    const endDateTime = new Date(duty.endTime);
    setStartDate(startDateTime.toISOString().slice(0, 10)); // Format to YYYY-MM-DD
    setStartTime(startDateTime.toISOString().slice(11, 16)); // Format to HH:mm
    setEndDate(endDateTime.toISOString().slice(0, 10)); // Format to YYYY-MM-DD
    setEndTime(endDateTime.toISOString().slice(11, 16)); // Format to HH:mm
    setRestPeriod(duty.restPeriod);
    setShowForm(true);
  };

  // Delete a duty
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/duties/${id}`);
      loadDuties(); // Reload the duties after deleting
    } catch (error) {
      console.error("Error deleting duty:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Duty Management</h2>
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? "Hide Duty Form" : "Assign New Duty"}
      </button>

      {showForm && <div className="flex flex-col mb-4">
        <input
          type="text"
          placeholder="Duty Name"
          value={dutyName}
          onChange={(e) => setDutyName(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <textarea
          placeholder="Duty Details"
          value={dutyDetails}
          onChange={(e) => setDutyDetails(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <select
          value={busId}
          onChange={(e) => setBusId(e.target.value)}
          className="mb-2 p-2 border rounded"
        >
          <option value="">Select Bus</option>
          {buses.map((bus) => (
            <option key={bus._id} value={bus._id}>
              {bus.busNumber} - {bus.capacity} capacity
            </option>
          ))}
        </select>
        <select
          value={crewId}
          onChange={(e) => setCrewId(e.target.value)}
          className="mb-2 p-2 border rounded"
        >
          <option value="">Select Crew</option>
          {crews.map((crew) => (
            <option key={crew._id} value={crew._id}>
              {crew.name} - {crew.employeeId}
            </option>
          ))}
        </select>
        <select
          value={dutyType}
          onChange={(e) => setDutyType(e.target.value)}
          className="mb-2 p-2 border rounded"
        >
          <option value="linked">Linked</option>
          <option value="unlinked">Unlinked</option>
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Rest Period (minutes)"
          value={restPeriod}
          onChange={(e) => setRestPeriod(Number(e.target.value))}
          className="mb-2 p-2 border rounded"
        />
        <button
          onClick={editDutyId ? handleUpdateDuty : handleAddDuty}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {editDutyId ? "Update Duty" : "Add Duty"}
        </button>
      </div>}

      <table className="min-w-full">
        <thead className="bg-gray-500">
          <tr>
            <th className="py-2 px-4">Duty Name</th>
            <th className="py-2 px-4">Duty Details</th>
            <th className="py-2 px-4">Bus</th>
            <th className="py-2 px-4">Crew</th>
            <th className="py-2 px-4">Duty Type</th>
            <th className="py-2 px-4">Start Time</th>
            <th className="py-2 px-4">End Time</th>
            <th className="py-2 px-4">Rest Period</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {duties.map((duty) => (
            <tr key={duty._id} className="border-b">
              <td className="py-2 px-4">{duty.name}</td>
              <td className="py-2 px-4">{duty?.bus?.busNumber}</td>
              <td className="py-2 px-4">{duty?.crew?.name}</td>
              <td className="py-2 px-4">{duty.dutyType}</td>
              <td className="py-2 px-4">
                {new Date(duty.startTime).toLocaleString([], {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </td>
              <td className="py-2 px-4">
                {new Date(duty.endTime).toLocaleString([], {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </td>
              <td className="py-2 px-4">{duty.restPeriod} minutes</td>
              <td className="py-2 px-4 flex space-x-2">
                {/* Edit button */}
                <button
                  onClick={() => handleEdit(duty)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(duty._id)}
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

export default DutyManagement;
