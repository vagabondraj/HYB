import { useState } from "react";
import { Send } from "lucide-react";

const MessageInput = ({ onSend }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content && !image) return;

    onSend({ content, image });
    setContent("");
    setImage(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t flex items-center gap-3"
    >
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-xl border focus:outline-none"
      />

      <button
        type="submit"
        className="bg-primary-500 text-white p-2 rounded-xl"
      >
        <Send size={18} />
      </button>
    </form>
  );
};

export default MessageInput;
