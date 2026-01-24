import ChatItem from "./ChatItem.jsx";

const ChatList = ({ chats, activeChat, onSelect, loading }) => {
  return (
    <div className="w-80 border-r border-neutral-200 dark:border-neutral-800 overflow-y-auto">
      <div className="p-4 font-bold text-lg">Chats</div>

      {loading && <p className="p-4 text-sm">Loading chats...</p>}

      {!loading && chats.length === 0 && (
        <p className="p-4 text-sm text-neutral-500">No chats yet</p>
      )}

      {chats.map(chat => (
        <ChatItem
          key={chat._id}
          chat={chat}
          isActive={activeChat?._id === chat._id}
          onClick={() => onSelect(chat)}
        />
      ))}
    </div>
  );
};

export default ChatList;
