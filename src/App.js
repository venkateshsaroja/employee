import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Login from "./page/Dashboard/login/login";

// Dummy authentication check function
const isAuthenticated = () => {
  // You can replace this with actual authentication logic
  return localStorage.getItem("authToken"); // Example of checking for an auth token
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/dashboard" element={<Dashboard />} 
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
