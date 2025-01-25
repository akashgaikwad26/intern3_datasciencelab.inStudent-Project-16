import AdminDashboard from "components/Dashboards/AdminDashboard/AdminDashboard";
import { Dashboards } from "components/Dashboards/Dashboard";
import UsersDashboard from "components/Dashboards/UsersDashboard/UsersDashboard";
import { Login } from "components/Login/Login";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboards />} />}
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
