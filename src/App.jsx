import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BusPage from "./pages/BusPage";
import CrewPage from "./pages/CrewPage";
import DutyPage from "./pages/DutyPage";
import RoutePage from "./pages/RoutePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buses" element={<BusPage />} />
        <Route path="/crews" element={<CrewPage />} />
        <Route path="/duties" element={<DutyPage />} />
        <Route path="/routes" element={<RoutePage />} />
      </Routes>
    </Router>
  );
};

export default App;
