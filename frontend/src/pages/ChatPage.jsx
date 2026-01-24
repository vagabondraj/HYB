import { useEffect, useState } from "react";
import chatAPI from "../api/chat.api.js";
import ChatList from "../components/chats/ChatList";
import ChatWindow from "../components/chats/ChatWindow";

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const res = await chatAPI.getMyChats();
        setChats(res.data.chats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadChats();
  }, []);

  return (
    <div className="h-screen flex bg-neutral-100 dark:bg-neutral-900">
      <ChatList
        chats={chats}
        activeChat={activeChat}
        onSelect={setActiveChat}
        loading={loading}
      />

      {activeChat ? (
        <ChatWindow chat={activeChat} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-neutral-500">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
};

export default ChatPage;
