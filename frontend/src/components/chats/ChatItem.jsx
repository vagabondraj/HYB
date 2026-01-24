import { useAuth } from "../../context/AuthContext.jsx";

const ChatItem = ({ chat, isActive, onClick }) => {
  const { user } = useAuth();
  const otherUser = chat.participants.find(p => p._id !== user._id);

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-4 cursor-pointer transition
        ${isActive ? "bg-primary-100 dark:bg-primary-900" : "hover:bg-neutral-200 dark:hover:bg-neutral-800"}
      `}
    >
      <img
        src={otherUser.avatar || "/avatar.png"}
        alt=""
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex-1">
        <p className="font-semibold">{otherUser.fullName}</p>
        <p className="text-xs text-neutral-500 truncate">
          {chat.lastMessage?.content || "No messages yet"}
        </p>
      </div>
    </div>
  );
};

export default ChatItem;
