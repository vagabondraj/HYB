import { useState, useCallback } from "react";
import { Clock, Trash2, Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import CategoryBadge from "./CategoryBadge.js";
import UrgencyBadge from "./UrgencyBadge.js";
import ConfirmDialog from "./ConfirmDialog.js";

const WINDOW_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes (must match backend)

const timeAgo = (date) => {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  return `${Math.floor(hours / 24)}d ago`;
};

const RequestCard = ({
  request,
  onClick,
  onDelete,
  showDelete = false,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { user } = useAuth();

  const canDelete = useCallback(() => {
    if (!showDelete || !user || !request?.createdAt) return false;

    const createdTime = new Date(request.createdAt).getTime();
    return Date.now() - createdTime < WINDOW_EXPIRY_TIME;
  }, [showDelete, user, request]);

  const handleDelete = async (e) => {
    e.stopPropagation();
    setShowConfirm(false);

    if (onDelete) {
      await onDelete(request._id);
    }
  };

  return (
    <>
      <div
        onClick={onClick}
        className="relative cursor-pointer rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:scale-[1.02] hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-800 group"
      >
        {showDelete && canDelete() && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirm(true);
            }}
            title="Delete request (available for 5 minutes)"
            className="absolute top-4 right-4 z-10 rounded-lg bg-red-100 p-2 text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
          >
            <Trash2 size={18} />
          </button>
        )}

        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={
                request.requestedBy?.avatar ||
                "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
              }
              alt="User avatar"
              className="h-12 w-12 rounded-full ring-2 ring-primary-200 dark:ring-primary-800"
            />
            <div>
              <h3 className="font-bold text-neutral-900 dark:text-white">
                {request.requestedBy?.fullName || "Unknown"}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {request.requestedBy?.branch || "—"} • Year{" "}
                {request.requestedBy?.year || "—"}
              </p>
            </div>
          </div>

          <span className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
            <Clock size={14} />
            {timeAgo(request.createdAt)}
          </span>
        </div>

        {/* Content */}
        <h4 className="mb-2 text-xl font-bold text-neutral-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
          {request.title}
        </h4>

        <p className="mb-5 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-300">
          {request.description}
        </p>

        {request.image && (
          <img
            src={request.image}
            alt="Request"
            className="mb-4 h-48 w-full rounded-xl object-cover"
          />
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <CategoryBadge category={request.category} />
            <UrgencyBadge urgency={request.urgency} />
          </div>

          {!showDelete && (
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-bold text-primary-600 hover:underline dark:text-primary-400"
            >
              I can help
              <Heart size={16} />
            </button>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Request"
        message="Are you sure you want to delete this request? This action cannot be undone and is only available within 5 minutes of creation."
        type="danger"
      />
    </>
  );
};

export default RequestCard;
