import { useEffect, useState } from "react";
import notificationAPI from "../api/notification.api.js";
import NotificationList from "../components/notifications/NotificationList.jsx";
import Toast from "../components/Toast.jsx";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page] = useState(1);
  const [limit] = useState(20);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await notificationAPI.getAll(page, limit);
      setNotifications(res.data || []);
    } catch (err) {
      Toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
      Toast.success("All notifications marked as read");
    } catch {
      Toast.error("Failed to mark all as read");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Notifications</h1>

        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={handleMarkAllRead}
            className="text-sm text-blue-600 hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      <NotificationList
        notifications={notifications}
        loading={loading}
        onUpdate={setNotifications}
      />
    </div>
  );
};

export default NotificationsPage;
