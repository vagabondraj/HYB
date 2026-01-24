import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import usersAPI from "../api/user.api.js";
import Header from "../components/Header.jsx";
import Toast from "../components/Toast.jsx";
import useToast from "../hooks/useToast.js";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast, showToast, hideToast } = useToast();

  const [stats, setStats] = useState({
    requestsCreated: 0,
    responsesGiven: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.userName) return;
    loadStats();
  }, [user]);

  const loadStats = async () => {
    try {
      const data = await usersAPI.getProfile(user.userName);
      setStats(
        data?.user?.stats || {
          requestsCreated: 0,
          responsesGiven: 0,
        }
      );
    } catch (error) {
      showToast("Failed to load profile stats", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <Header />
        <div className="py-20 text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

      <Header />

      <main className="mx-auto max-w-4xl px-6 py-8">
        <button
          onClick={() => navigate("/home")}
          className="mb-8 flex items-center gap-2 font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ChevronLeft size={22} />
          Back to Home
        </button>

        <div className="rounded-3xl border border-neutral-200 bg-white p-10 shadow-2xl dark:border-neutral-700 dark:bg-neutral-800">
          {/* Header */}
          <div className="mb-10 flex items-start gap-8">
            <img
              src={
                user?.avatar ||
                "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
              }
              alt="User avatar"
              className="h-32 w-32 rounded-full ring-4 ring-primary-200 shadow-lg dark:ring-primary-800"
            />

            <div className="flex-1">
              <h1 className="mb-3 text-4xl font-bold text-neutral-900 dark:text-white">
                {user?.fullName}
              </h1>
              <p className="mb-2 text-lg text-neutral-600 dark:text-neutral-400">
                @{user?.userName}
              </p>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                {user?.branch} • Year {user?.year}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl bg-red-50 px-6 py-3 font-bold text-red-600 transition-all hover:bg-red-100 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>

          {/* Stats */}
          <div className="mb-10 grid grid-cols-3 gap-6">
            <StatCard
              value={user?.helpCount || 0}
              label="Times Helped"
              color="primary"
            />
            <StatCard
              value={stats.requestsCreated}
              label="Requests Created"
              color="accent"
            />
            <StatCard
              value={stats.responsesGiven}
              label="Responses Given"
              color="orange"
            />
          </div>

          {/* Contact */}
          <div className="border-t-2 border-neutral-200 pt-8 dark:border-neutral-700">
            <h2 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-white">
              Contact Information
            </h2>

            <div className="space-y-3 text-lg text-neutral-600 dark:text-neutral-400">
              <p>
                <strong className="text-neutral-900 dark:text-white">
                  Email:
                </strong>{" "}
                {user?.email}
              </p>
              <p>
                <strong className="text-neutral-900 dark:text-white">
                  Member since:
                </strong>{" "}
                {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ value, label, color }) => {
  const colorMap = {
    primary:
      "from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 text-primary-600 dark:text-primary-400",
    accent:
      "from-accent-50 to-accent-100 dark:from-accent-900 dark:to-accent-800 text-accent-600 dark:text-accent-400",
    orange:
      "from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 text-orange-600 dark:text-orange-400",
  };

  return (
    <div
      className={`rounded-2xl bg-linear-to-br p-6 text-center shadow-lg ${colorMap[color]}`}
    >
      <div className="mb-2 text-5xl font-black">{value}</div>
      <div className="text-sm font-bold">{label}</div>
    </div>
  );
};

export default ProfilePage;
