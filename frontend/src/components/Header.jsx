import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Moon,
  Sun,
  Bell,
  User,
  LogOut,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    setShowMenu(false);
    navigate("/");
  }, [logout, navigate]);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3"
          >
            <Heart
              size={32}
              className="text-primary-600 dark:text-primary-400"
              fill="currentColor"
            />
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              HYB
            </span>
          </button>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-xl p-2.5 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700"
            >
              {isDark ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            {user && (
              <>
                {/* Notifications */}
                <button
                  onClick={() => navigate("/notifications")}
                  aria-label="Notifications"
                  className="relative rounded-xl p-2.5 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <Bell size={22} />
                  <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500 dark:border-neutral-800" />
                </button>

                {/* Profile menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowMenu((prev) => !prev)}
                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                  >
                    <img
                      src={
                        user.avatar ||
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                      }
                      alt="User avatar"
                      className="h-10 w-10 rounded-full ring-2 ring-primary-200 dark:ring-primary-800"
                    />
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-neutral-200 bg-white py-2 shadow-2xl dark:border-neutral-700 dark:bg-neutral-800">
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setShowMenu(false);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      >
                        <User
                          size={18}
                          className="text-neutral-600 dark:text-neutral-400"
                        />
                        <span className="font-medium">Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          navigate("/my-requests");
                          setShowMenu(false);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      >
                        <MessageCircle
                          size={18}
                          className="text-neutral-600 dark:text-neutral-400"
                        />
                        <span className="font-medium">My Requests</span>
                      </button>

                      <div className="my-2 h-px bg-neutral-200 dark:bg-neutral-700" />

                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
