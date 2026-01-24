const MessageBubble = ({ message, isOwn }) => {
  if (message.isDeleted) {
    return (
      <div className="text-xs text-center text-neutral-400 italic">
        Message deleted
      </div>
    );
  }

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl text-sm
          ${isOwn
            ? "bg-primary-500 text-white rounded-br-none"
            : "bg-neutral-200 dark:bg-neutral-700 rounded-bl-none"}
        `}
      >
        {message.content}
        {message.image && (
          <img
            src={message.image.url}
            alt=""
            className="mt-2 rounded-lg max-h-60"
          />
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
