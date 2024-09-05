import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const BusManagement = () => {
  const [buses, setBuses] = useState([]);
  const [busNumber, setBusNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [isAC, setIsAC] = useState(false);
  const [condition, setCondition] = useState("Good");
  const [gender, setGender] = useState("General");
  const [editBusId, setEditBusId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadBuses();
  }, []);

  // Load all buses
  const loadBuses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/buses`);
      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  // Add a new bus
  const handleAddBus = async () => {
    try {
      await axios.post(`${API_BASE_URL}/buses`, { busNumber, capacity, isAC, condition, gender });
      loadBuses();  // Reload the buses after adding
      resetForm();
    } catch (error) {
      console.error("Error adding bus:", error);
    }
  };

  // Update an existing bus
  const handleUpdateBus = async () => {
    try {
      await axios.put(`${API_BASE_URL}/buses/${editBusId}`, { busNumber, capacity, isAC, condition, gender });
      loadBuses();  // Reload the buses after updating
      resetForm();  // Clear the form after updating
    } catch (error) {
      console.error("Error updating bus:", error);
    }
  };

  // Reset the form fields
  const resetForm = () => {
    setBusNumber("");
    setCapacity("");
    setIsAC(false);
    setCondition("Good");
    setGender("General");
    setEditBusId(null);
  };

  // Edit a bus (set fields for editing)
  const handleEdit = (bus) => {
    setEditBusId(bus._id);  // Ensure this uses _id (MongoDB default)
    setBusNumber(bus.busNumber);
    setCapacity(bus.capacity);
    setIsAC(bus.isAC);
    setCondition(bus.condition);
    setGender(bus.gender);
    setShowForm(true);
  };

  // Delete a bus
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/buses/${id}`);
      loadBuses();  // Reload the buses after deleting
    } catch (error) {
      console.error("Error deleting bus:", error);
    }
  };

  return (
    <div className="p-4">

      <h2 className="text-2xl font-bold mb-4">Bus Management</h2>
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? "Hide Bus Form" : "Add New Bus"}
      </button>

      {showForm && <div className="flex flex-col mb-4">
        <label className="mb-2 font-bold">Bus Number</label>
        <input
          type="text"
          placeholder="Bus Number"
          value={busNumber}
          onChange={(e) => setBusNumber(e.target.value)}
          className="mb-2 p-2 border rounded"
        />

        <label className="mb-2 font-bold">Capacity</label>
        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="mb-2 p-2 border rounded"
        />

        <label className="mb-2 font-bold flex items-center">
          <input
            type="checkbox"
            checked={isAC}
            onChange={() => setIsAC(!isAC)}
            className="mr-2"
          />
          AC
        </label>

        <label className="mb-2 font-bold">Quality of Bus</label>
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="mb-2 p-2 border rounded"
        >
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>

        <label className="mb-2 font-bold">Bus Category</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="mb-2 p-2 border rounded"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="General">General</option>
        </select>

        <button
          onClick={editBusId ? handleUpdateBus : handleAddBus}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {editBusId ? "Update Bus" : "Add Bus"}
        </button>
      </div>}

      <table className="min-w-full">
        <thead className="bg-gray-500">
          <tr>
            <th className="py-2 px-4">Bus Number</th>
            <th className="py-2 px-4">Capacity</th>
            <th className="py-2 px-4">AC</th>
            <th className="py-2 px-4">Condition</th>
            <th className="py-2 px-4">Gender</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus._id} className="border-b">
              <td className="py-2 px-4">{bus.busNumber}</td>
              <td className="py-2 px-4">{bus.capacity}</td>
              <td className="py-2 px-4">{bus.isAC ? 'Yes' : 'No'}</td>
              <td className="py-2 px-4">{bus.condition}</td>
              <td className="py-2 px-4">{bus.gender}</td>
              <td className="py-2 px-4 flex space-x-2">
                {/* Edit button */}
                <button
                  onClick={() => handleEdit(bus)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(bus._id)}
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

export default BusManagement;
