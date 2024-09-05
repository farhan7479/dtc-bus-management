import React, { useEffect, useState } from "react";
import axios from "axios";

const RouteManagement = () => {
  const [routes, setRoutes] = useState([]);
  const [routeName, setRouteName] = useState("");
  const [stops, setStops] = useState("");
  const [selectedBuses, setSelectedBuses] = useState([]);
  const [allBuses, setAllBuses] = useState([]);
  const [startPeakHour, setStartPeakHour] = useState(getTodayDateTime());
  const [endPeakHour, setEndPeakHour] = useState(getTodayDateTime());
  const [trafficData, setTrafficData] = useState("Light");
  const [densityData, setDensityData] = useState("Low");
  const [frequency, setFrequency] = useState("");
  const [editRouteId, setEditRouteId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    loadRoutes();
    loadBuses();
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

  // Load all buses
  const loadBuses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/buses`);
      setAllBuses(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  // Get today's date and time in ISO format
  function getTodayDateTime() {
    const now = new Date();
    now.setSeconds(0, 0); // Reset seconds and milliseconds
    return now.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM
  }

  // Handle multiple bus selection
  const handleBusSelection = (e) => {
    const options = e.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedBuses(selectedValues);
  };

  // Add a new route
  const handleAddRoute = async () => {
    try {
      await axios.post(`${API_BASE_URL}/routes`, {
        routeName,
        stops: stops.split(",").map((stop) => stop.trim()),
        buses: selectedBuses,
        peakHours: [{ start: startPeakHour, end: endPeakHour, frequency }],
        trafficData,
        densityData,
      });
      loadRoutes(); // Reload the routes after adding
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
        stops: stops.split(",").map((stop) => stop.trim()),
        buses: selectedBuses,
        peakHours: [{ start: startPeakHour, end: endPeakHour, frequency }],
        trafficData,
        densityData,
      });
      loadRoutes(); // Reload the routes after updating
      resetFields();
    } catch (error) {
      console.error("Error updating route:", error);
    }
  };

  // Edit a route (set fields for editing)
  const handleEdit = (route) => {
    setEditRouteId(route._id);
    setRouteName(route.routeName);
    setStops(route.stops.join(", ")); // Convert array to comma-separated string
    setSelectedBuses(route.buses); // Set selected buses
    setStartPeakHour(route.peakHours[0]?.start || getTodayDateTime());
    setEndPeakHour(route.peakHours[0]?.end || getTodayDateTime());
    setTrafficData(route.trafficData);
    setDensityData(route.densityData);
    setFrequency(route.frequency || ""); // Set frequency
    setShowForm(true);
  };

  // Delete a route
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/routes/${id}`);
      loadRoutes(); // Reload the routes after deleting
    } catch (error) {
      console.error("Error deleting route:", error);
    }
  };

  // Reset form fields
  const resetFields = () => {
    setRouteName("");
    setStops("");
    setSelectedBuses([]);
    setStartPeakHour(getTodayDateTime());
    setEndPeakHour(getTodayDateTime());
    setTrafficData("Light");
    setDensityData("Low");
    setFrequency(""); // Reset frequency
    setEditRouteId(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Route Management</h2>
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? "Hide Route Form" : "Assign New Route"}
      </button>
      {showForm && (
        <div className="flex flex-col mb-4">
          {/* Form fields */}
        </div>
      )}

      {/* Add horizontal scroll for smaller screens */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-500">
            <tr>
              <th className="py-2 px-4 border-b">Route Name</th>
              <th className="py-2 px-4 border-b">Stops</th>
              <th className="py-2 px-4 border-b">Buses</th>
              <th className="py-2 px-4 border-b">Peak Hours</th>
              <th className="py-2 px-4 border-b">Traffic Data</th>
              <th className="py-2 px-4 border-b">Density Data</th>
              <th className="py-2 px-4 border-b">Frequency</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route._id} className="border-b">
                <td className="py-2 px-4">{route.routeName}</td>
                <td className="py-2 px-4">{route.stops.join(", ")}</td>
                <td className="py-2 px-4">
                  {route.buses.map((bus) => bus.busNumber).join(", ")}
                </td>
                <td className="py-2 px-4">
                  {route.peakHours.map((ph, index) => (
                    <div key={index}>
                      {new Date(ph.start).toLocaleTimeString()} -{" "}
                      {new Date(ph.end).toLocaleTimeString()}
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4">{route.trafficData}</td>
                <td className="py-2 px-4">{route.densityData}</td>
                <td className="py-2 px-4">{route?.peakHours[0]?.frequency}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(route)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(route._id)}
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
    </div>
  );
};

export default RouteManagement;