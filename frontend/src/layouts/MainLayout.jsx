import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>

      {/* Footer can be added later */}
    </div>
  );
};

export default MainLayout;
