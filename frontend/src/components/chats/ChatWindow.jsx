import { useEffect, useState } from "react";
import chatAPI from "../../api/chat.api.js";
import MessageBubble from "./MessageBubble.jsx";
import MessageInput from "./MessageInput.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const ChatWindow = ({ chat }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadMessages = async () => {
      const res = await chatAPI.getMessages(chat._id);
      setMessages(res.data.messages);
    };
    loadMessages();
  }, [chat._id]);

  const handleSend = async (data) => {
    const res = await chatAPI.sendMessage(chat._id, data);
    setMessages(prev => [...prev, res.data.message]);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b font-semibold">
        Chat
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map(msg => (
          <MessageBubble
            key={msg._id}
            message={msg}
            isOwn={msg.sender._id === user._id}
          />
        ))}
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
