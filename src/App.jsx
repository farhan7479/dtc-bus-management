import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BusPage from "./pages/BusPage";
import CrewPage from "./pages/CrewPage";
import DutyPage from "./pages/DutyPage";
import RoutePage from "./pages/RoutePage";
import Carouse from "./components/Carouse";

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out ${
        isActive
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-gray-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link to="/" className="flex items-center">
                    <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                    </svg>
                    <span className="ml-2 text-white text-xl font-bold">TransitApp</span>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/buses">Buses</NavLink>
                    <NavLink to="/crews">Crews</NavLink>
                    <NavLink to="/duties">Duties</NavLink>
                    <NavLink to="/routes">Routes</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buses" element={<BusPage />} />
            <Route path="/crews" element={<CrewPage />} />
            <Route path="/duties" element={<DutyPage />} />
            <Route path="/routes" element={<RoutePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;