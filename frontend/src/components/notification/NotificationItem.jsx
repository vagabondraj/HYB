import notificationAPI from "../../api/notification.api.js";
import Toast from "../Toast.jsx";
import { formatDistanceToNow } from "date-fns";

const typeColors = {
  info: "border-blue-500",
  success: "border-green-500",
  warning: "border-yellow-500",
  danger: "border-red-500",
};

const NotificationItem = ({ notification, onUpdate }) => {
  const { _id, message, isRead, type, createdAt } = notification;

  const markAsRead = async () => {
    if (isRead) return;

    try {
      await notificationAPI.markAsRead(_id);
      onUpdate((prev) =>
        prev.map((n) =>
          n._id === _id ? { ...n, isRead: true } : n
        )
      );
    } catch {
      Toast.error("Failed to mark as read");
    }
  };

  const deleteNotification = async () => {
    try {
      await notificationAPI.delete(_id);
      onUpdate((prev) => prev.filter((n) => n._id !== _id));
      Toast.success("Notification deleted");
    } catch {
      Toast.error("Failed to delete notification");
    }
  };

  return (
    <div
      onClick={markAsRead}
      className={`p-4 border-l-4 rounded cursor-pointer transition
        ${typeColors[type] || "border-gray-400"}
        ${isRead ? "bg-gray-50 dark:bg-gray-800" : "bg-blue-50 dark:bg-gray-700"}
      `}
    >
      <div className="flex justify-between items-start">
        <p className={`text-sm ${isRead ? "text-gray-600" : "font-medium"}`}>
          {message}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteNotification();
          }}
          className="text-xs text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-1">
        {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
      </p>
    </div>
  );
};

export default NotificationItem;
