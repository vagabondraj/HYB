import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import requestsAPI from "../api/request.api.js";
import Header from "../components/Header.jsx";
import RequestCard from "../components/RequestCard.jsx";
import Toast from "../components/Toast.jsx";
import useToast from "../hooks/useToast.js";

const MyRequestsPage = () => {
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyRequests();
  }, []);

  const loadMyRequests = async () => {
    setLoading(true);
    try {
      const data = await requestsAPI.getMyRequests();
      setRequests(data?.requests || []);
    } catch (error) {
      showToast("Failed to load your requests", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (requestId) => {
    try {
      await requestsAPI.delete(requestId);

      setRequests((prev) =>
        prev.filter((request) => request._id !== requestId)
      );

      showToast("Request deleted successfully", "success");
    } catch (error) {
      showToast(
        error?.message || "Failed to delete request",
        "error"
      );
    }
  };

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
        <button
          onClick={() => navigate("/home")}
          className="mb-8 flex items-center gap-2 font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ChevronLeft size={22} />
          Back to Home
        </button>

        <h1 className="mb-8 text-4xl font-bold text-neutral-900 dark:text-white">
          My Requests
        </h1>

        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
          </div>
        ) : requests.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mb-6 text-6xl">📋</div>
            <h3 className="mb-3 text-2xl font-bold text-neutral-900 dark:text-white">
              No requests yet
            </h3>
            <p className="mb-6 text-neutral-600 dark:text-neutral-400">
              Create your first request to get help from the community!
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
                onClick={() => navigate(`/request/${request._id}`)}
                onDelete={handleDelete}
                showDelete
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyRequestsPage;
