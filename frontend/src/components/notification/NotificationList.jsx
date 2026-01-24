import NotificationItem from "./NotificationItem.jsx";

const NotificationList = ({ notifications, loading, onUpdate }) => {
  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!notifications.length) {
    return (
      <p className="text-center text-gray-400">
        No notifications yet
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification._id}
          notification={notification}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default NotificationList;
