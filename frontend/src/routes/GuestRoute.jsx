// src/routes/GuestRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const GuestRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return !user ? <Outlet /> : <Navigate to="/" replace />;
};

export default GuestRoute;
