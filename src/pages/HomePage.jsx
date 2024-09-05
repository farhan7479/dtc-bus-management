import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-gray-900 typing-effect">
                Welcome to TransitApp
              </h1>
            </div>

            {/* Main Sections */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
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

            {/* About Section */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-6">About TransitApp</h2>
              <p className="text-lg text-gray-700">
                TransitApp is your comprehensive solution for managing all aspects of public transportation. Whether you're looking to streamline bus operations, manage crew schedules, assign duties, or optimize routes, TransitApp provides an intuitive interface and powerful features to enhance your transit operations.
              </p>
            </div>

            {/* Features Section */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">Comprehensive Bus Management</h3>
                  <p className="text-gray-700">Easily track and manage your entire bus fleet, including maintenance schedules and operational status.</p>
                </div>
                <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">Efficient Crew Scheduling</h3>
                  <p className="text-gray-700">Organize and manage crew assignments, track their working hours, and ensure optimal scheduling.</p>
                </div>
                <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">Effective Duty Assignment</h3>
                  <p className="text-gray-700">Assign and monitor duties to crew members, ensuring that all tasks are completed on time.</p>
                </div>
                <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">Advanced Route Planning</h3>
                  <p className="text-gray-700">Plan and optimize transit routes to improve efficiency and service quality.</p>
                </div>
              </div>
            </div>

            {/* Get Started Section */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6">Get Started</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">Sign In</h3>
                  <p className="text-gray-700">Access your account and manage your settings.</p>
                </div>
                <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">Sign Up</h3>
                  <p className="text-gray-700">Create a new account to get started with TransitApp.</p>
                </div>
                <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3">Learn More</h3>
                  <p className="text-gray-700">Discover more about TransitApp and how to use it effectively.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm mb-2">© {new Date().getFullYear()} TransitApp. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mb-2">
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
            <a href="/contact" className="hover:underline">Contact Us</a>
          </div>
          <p className="text-sm">Follow us on
            <a href="https://twitter.com" className="text-blue-400 hover:underline ml-1">Twitter</a>,
            <a href="https://facebook.com" className="text-blue-600 hover:underline ml-1">Facebook</a>, and
            <a href="https://linkedin.com" className="text-blue-700 hover:underline ml-1">LinkedIn</a>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
