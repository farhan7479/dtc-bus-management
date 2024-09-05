import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
          Welcome to TransitApp
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/buses"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Bus Management</h2>
              <p className="text-blue-100">Manage and track your bus fleet</p>
            </div>
          </Link>
          <Link
            to="/crews"
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Crew Management</h2>
              <p className="text-green-100">Organize and schedule your crew</p>
            </div>
          </Link>
          <Link
            to="/duties"
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Duty Management</h2>
              <p className="text-purple-100">Assign and monitor duties</p>
            </div>
          </Link>
          <Link
            to="/routes"
            className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Route Management</h2>
              <p className="text-orange-100">Plan and optimize transit routes</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;