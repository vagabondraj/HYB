import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/home"
          className="text-xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          SelfStudy
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/home" className="hover:text-indigo-500">
            Home
          </Link>
          <Link to="/create_request" className="hover:text-indigo-500">
            Create
          </Link>
          <Link to="/my_request_page" className="hover:text-indigo-500">
            My Requests
          </Link>
          <Link to="/profile" className="hover:text-indigo-500">
            Profile
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
