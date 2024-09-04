import React, { useEffect, useState } from "react";
import axios from "axios";

const BusManagement = () => {
  const [buses, setBuses] = useState([]);
  const [busNumber, setBusNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [editBusId, setEditBusId] = useState(null);

  const API_BASE_URL = "http://localhost:8080/api";  // Base URL for your backend API

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
      await axios.post(`${API_BASE_URL}/buses`, { busNumber, capacity });
      loadBuses();  // Reload the buses after adding
      setBusNumber("");
      setCapacity("");
    } catch (error) {
      console.error("Error adding bus:", error);
    }
  };

  // Update an existing bus
  const handleUpdateBus = async () => {
    try {
      await axios.put(`${API_BASE_URL}/buses/${editBusId}`, { busNumber, capacity });
      loadBuses();  // Reload the buses after updating
      setEditBusId(null);
      setBusNumber("");
      setCapacity("");
    } catch (error) {
      console.error("Error updating bus:", error);
    }
  };

  // Edit a bus (set fields for editing)
  const handleEdit = (bus) => {
    setEditBusId(bus.id);
    setBusNumber(bus.busNumber);
    setCapacity(bus.capacity);
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

      <div className="flex flex-col mb-4">
        <input
          type="text"
          placeholder="Bus Number"
          value={busNumber}
          onChange={(e) => setBusNumber(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <button
          onClick={editBusId ? handleUpdateBus : handleAddBus}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {editBusId ? "Update Bus" : "Add Bus"}
        </button>
      </div>

      <table className="min-w-full ">
        <thead className="bg-gray-500">
          <tr>
            <th className="py-2 px-4">Bus Number</th>
            <th className="py-2 px-4">Capacity</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id} className="border-b">
              <td className="py-2 px-4">{bus.busNumber}</td>
              <td className="py-2 px-4">{bus.capacity}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(bus)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(bus.id)}
                  className="bg-red-500 text-white p-1 rounded"
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
