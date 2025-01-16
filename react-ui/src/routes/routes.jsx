import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "../components/Login/Login";
import { Welcome } from "../components/Welcome/Welcome";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/welcome"
          element={<Welcome />}
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
