import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import requestsAPI from "../api/request.api";
import Header from "../components/Header.jsx";
import CategoryBadge from "../components/CategoryBadge.jsx";
import UrgencyBadge from "../components/UrgencyBadge.jsx";
import Toast from "../components/Toast.jsx";
import useToast from "../hooks/useToast.js";

const RequestDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    loadRequest();
  }, [id]);

  const loadRequest = async () => {
    setLoading(true);
    try {
      const data = await requestsAPI.getById(id);
      setRequest(data?.request || null);
    } catch (error) {
      showToast("Failed to load request", "error");
    } finally {
      setLoading(false);
    }
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

  if (!request) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <Header />
        <div className="py-20 text-center">
          <div className="mb-6 text-6xl">🔍</div>
          <h3 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-white">
            Request not found
          </h3>
          <button
            onClick={() => navigate("/home")}
            className="rounded-2xl bg-primary-600 px-8 py-4 font-bold text-white hover:bg-primary-700"
          >
            Go to Home
          </button>
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
          {/* User Header */}
          <div className="mb-6 flex items-start gap-4">
            <img
              src={
                request.requestedBy?.avatar ||
                "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
              }
              alt="User avatar"
              className="h-16 w-16 rounded-full ring-2 ring-primary-200 dark:ring-primary-800"
            />

            <div className="flex-1">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                {request.requestedBy?.fullName || "Unknown"}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {request.requestedBy?.branch || "—"} • Year{" "}
                {request.requestedBy?.year || "—"}
              </p>
            </div>

            <div className="flex gap-2">
              <CategoryBadge category={request.category} />
              <UrgencyBadge urgency={request.urgency} />
            </div>
          </div>

          {/* Content */}
          <h1 className="mb-4 text-4xl font-bold text-neutral-900 dark:text-white">
            {request.title}
          </h1>

          <p className="mb-6 text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
            {request.description}
          </p>

          {request.image && (
            <img
              src={request.image}
              alt="Request"
              className="mb-6 w-full rounded-2xl object-cover"
            />
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <button className="btn btn-primary flex-1">
              I Can Help
            </button>
            <button className="btn btn-ghost">
              Share
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RequestDetailPage;
