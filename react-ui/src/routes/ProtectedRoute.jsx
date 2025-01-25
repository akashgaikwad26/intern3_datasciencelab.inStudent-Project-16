import React from "react";
import { Navigate } from "react-router-dom";
import { parse } from "utils/parse";

const ProtectedRoute = ({ element }) => {
  const userDetails = parse(localStorage.getItem("userDetails"));
  const isAuthenticated = !!userDetails.username;

  // console.log("userDetails:", userDetails);
  // console.log("!userDetails.username:", !userDetails.username);
  // console.log("!!userDetails.username:", !!userDetails.username);

  // console.log("isAuthenticated:", isAuthenticated);

  return isAuthenticated ? (
    element
  ) : (
    <Navigate
      to="/"
      replace
    />
  );
};

export default ProtectedRoute;
