import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import requestsAPI from "../api/request.api.js";
import Header from "../components/Header.jsx";
import RequestCard from "../components/RequestCard.jsx";
import Toast from "../components/Toast.jsx";
import useToast from "../hooks/useToast.js";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast, showToast, hideToast } = useToast();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    "medicine",
    "notes",
    "sports",
    "food",
    "stationery",
  ];

  const loadRequests = useCallback(async () => {
    setLoading(true);
    try {
      const filters =
        selectedCategory !== "all"
          ? { category: selectedCategory }
          : {};

      const data = await requestsAPI.getAll(filters);
      setRequests(data?.requests || []);
    } catch (error) {
      showToast("Failed to load requests", "error");
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, showToast]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

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

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Welcome Banner */}
        <div className="mb-10 rounded-3xl bg-linear-to-r from-primary-500 via-primary-600 to-accent-500 p-10 text-white shadow-xl">
          <h2 className="mb-3 text-4xl font-bold">
            Welcome back, {user?.fullName || "Buddy"} 👋
          </h2>
          <p className="mb-6 text-lg opacity-95">
            You've helped {user?.helpCount || 0} students so far. Keep up
            the great work!
          </p>
          <button
            onClick={() => navigate("/create")}
            className="flex items-center gap-2.5 rounded-2xl bg-white px-8 py-4 font-bold text-primary-600 shadow-lg transition-all hover:scale-105 hover:bg-neutral-50 hover:shadow-xl active:scale-95"
          >
            <Plus size={22} strokeWidth={3} />
            Create New Request
          </button>
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap rounded-xl px-6 py-3 text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? "scale-105 bg-primary-600 text-white shadow-lg"
                  : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Requests */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              Loading requests...
            </p>
          </div>
        ) : requests.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mb-6 text-6xl">🔍</div>
            <h3 className="mb-3 text-2xl font-bold text-neutral-900 dark:text-white">
              No requests found
            </h3>
            <p className="mb-6 text-neutral-600 dark:text-neutral-400">
              Be the first to create a request in this category!
            </p>
            <button
              onClick={() => navigate("/create")}
              className="rounded-2xl bg-primary-600 px-8 py-4 font-bold text-white transition-all hover:bg-primary-700"
            >
              Create Request
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {requests.map((request) => (
              <RequestCard
                key={request._id}
                request={request}
                onClick={() =>
                  navigate(`/request/${request._id}`)
                }
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
