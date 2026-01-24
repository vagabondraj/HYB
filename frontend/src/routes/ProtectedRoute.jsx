// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return null; // or loader

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
