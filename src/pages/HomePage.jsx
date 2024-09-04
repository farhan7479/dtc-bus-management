import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Home Page</h1>
      <div className="space-y-4">
        <Link to="/buses" className="block bg-blue-500 text-white p-4 rounded text-center">
          Bus Management
        </Link>
        <Link to="/crews" className="block bg-green-500 text-white p-4 rounded text-center">
          Crew Management
        </Link>
        <Link to="/duties" className="block bg-yellow-500 text-white p-4 rounded text-center">
          Duty Management
        </Link>
        <Link to="/routes" className="block bg-red-500 text-white p-4 rounded text-center">
          Route Management
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
