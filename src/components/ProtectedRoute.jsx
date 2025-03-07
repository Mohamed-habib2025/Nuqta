import React from 'react'
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const user = false;

  return user ? children : <Navigate to="/landingpage" />;
}

export default ProtectedRoute
