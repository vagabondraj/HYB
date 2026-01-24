import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const AdminGuard = ({ children }) => {
  const { user, loading } = useAuth();

  // While auth state is loading
  if (loading) {
    return <div className="p-6">Checking permissions...</div>;
  }

  // Not logged in or not admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminGuard;
