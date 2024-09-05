import React from "react";
import DutyManagement from "../components/DutyManagement";

const DutyPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-purple-600">
              <h1 className="text-3xl font-bold text-white">Duty Management</h1>
            </div>
            <div className="p-6">
              <DutyManagement />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DutyPage;