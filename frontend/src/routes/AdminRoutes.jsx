import { Routes, Route } from "react-router-dom";
import Reports from "../pages/admin/Reports.jsx";
import AdminGuard from "../components/admin/AdminGuard.jsx";

const AdminRoutes = () => {
  return (
    <AdminGuard>
      <Routes>
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </AdminGuard>
  );
};

export default AdminRoutes;
