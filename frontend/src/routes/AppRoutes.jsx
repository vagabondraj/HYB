import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import CreateRequestPage from "../pages/CreateRequestPage.jsx";
import MyRequestsPage from "../pages/MyRequestPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import RequestDetailPage from "../pages/RequestDetailPage.jsx";

import AdminRoutes from "./AdminRoutes.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import GuestRoute from "./GuestRoute.jsx";

import MainLayout from "../layouts/MainLayout.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />

      {/* Guest only */}
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/create_request" element={<CreateRequestPage />} />
          <Route path="/my_request_page" element={<MyRequestsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/req-detail" element={<RequestDetailPage />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
