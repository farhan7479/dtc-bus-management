import React, { useEffect, useState } from "react";
import axios from "axios";

const RouteManagement = () => {
  const [routes, setRoutes] = useState([]);
  const [routeName, setRouteName] = useState("");
  const [stops, setStops] = useState("");
  const [buses, setBuses] = useState("");
  const [peakHours, setPeakHours] = useState("");
  const [trafficData, setTrafficData] = useState("Light");
  const [densityData, setDensityData] = useState("Low");
  const [editRouteId, setEditRouteId] = useState(null);

  const API_BASE_URL = "http://localhost:8080/api"; // Base URL for your backend API

  useEffect(() => {
    loadRoutes();
  }, []);

  // Load all routes
  const loadRoutes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/routes`);
      setRoutes(response.data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  // Add a new route
  const handleAddRoute = async () => {
    try {
      await axios.post(`${API_BASE_URL}/routes`, {
        routeName,
        stops: stops.split(',').map(stop => stop.trim()), // Convert comma-separated string to array
        buses: buses.split(',').map(bus => bus.trim()), // Convert comma-separated string to array
        peakHours: JSON.parse(peakHours),
        trafficData,
        densityData
      });
      loadRoutes();  // Reload the routes after adding
      resetFields();
    } catch (error) {
      console.error("Error adding route:", error);
    }
  };

  // Update an existing route
  const handleUpdateRoute = async () => {
    try {
      await axios.put(`${API_BASE_URL}/routes/${editRouteId}`, {
        routeName,
        stops: stops.split(',').map(stop => stop.trim()), // Convert comma-separated string to array
        buses: buses.split(',').map(bus => bus.trim()), // Convert comma-separated string to array
        peakHours: JSON.parse(peakHours),
        trafficData,
        densityData
      });
      loadRoutes();  // Reload the routes after updating
      resetFields();
    } catch (error) {
      console.error("Error updating route:", error);
    }
  };

  // Edit a route (set fields for editing)
  const handleEdit = (route) => {
    setEditRouteId(route._id);
    setRouteName(route.routeName);
    setStops(route.stops.join(', ')); // Convert array to comma-separated string
    setBuses(route.buses.join(', ')); // Convert array to comma-separated string
    setPeakHours(JSON.stringify(route.peakHours));
    setTrafficData(route.trafficData);
    setDensityData(route.densityData);
  };

  // Delete a route
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/routes/${id}`);
      loadRoutes();  // Reload the routes after deleting
    } catch (error) {
      console.error("Error deleting route:", error);
    }
  };

  // Reset form fields
  const resetFields = () => {
    setRouteName("");
    setStops("");
    setBuses("");
    setPeakHours("");
    setTrafficData("Light");
    setDensityData("Low");
    setEditRouteId(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Route Management</h2>

      <div className="flex flex-col mb-4">
        <input
          type="text"
          placeholder="Route Name"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Stops (comma-separated)"
          value={stops}
          onChange={(e) => setStops(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Buses (comma-separated)"
          value={buses}
          onChange={(e) => setBuses(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <textarea
          placeholder='Peak Hours (JSON format, e.g. [{"start":"2024-01-01T08:00:00Z","end":"2024-01-01T10:00:00Z","frequency":30}])'
          value={peakHours}
          onChange={(e) => setPeakHours(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <select
          value={trafficData}
          onChange={(e) => setTrafficData(e.target.value)}
          className="mb-2 p-2 border rounded"
        >
          <option value="Light">Light</option>
          <option value="Moderate">Moderate</option>
          <option value="Heavy">Heavy</option>
        </select>
        <select
          value={densityData}
          onChange={(e) => setDensityData(e.target.value)}
          className="mb-2 p-2 border rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          onClick={editRouteId ? handleUpdateRoute : handleAddRoute}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {editRouteId ? "Update Route" : "Add Route"}
        </button>
      </div>

      <table className="min-w-full">
        <thead className="bg-gray-500">
          <tr>
            <th className="py-2 px-4 border-b">Route Name</th>
            <th className="py-2 px-4 border-b">Stops</th>
            <th className="py-2 px-4 border-b">Buses</th>
            <th className="py-2 px-4 border-b">Peak Hours</th>
            <th className="py-2 px-4 border-b">Traffic Data</th>
            <th className="py-2 px-4 border-b">Density Data</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route._id} className="border-b">
              <td className="py-2 px-4">{route.routeName}</td>
              <td className="py-2 px-4">{route.stops.join(', ')}</td>
              <td className="py-2 px-4">{route.buses.join(', ')}</td>
              <td className="py-2 px-4">{JSON.stringify(route.peakHours)}</td>
              <td className="py-2 px-4">{route.trafficData}</td>
              <td className="py-2 px-4">{route.densityData}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(route)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(route._id)}
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

export default RouteManagement;
