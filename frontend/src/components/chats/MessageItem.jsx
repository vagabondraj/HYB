import { useState } from "react";
import ReportModal from "../reports/ReportModal.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const MessageItem = ({ message }) => {
  const { user } = useAuth();
  const [openReport, setOpenReport] = useState(false);

  if (message.isDeleted) {
    return (
      <div className="text-xs text-neutral-400 italic">
        Message deleted
      </div>
    );
  }

  const isOwnMessage = message.sender?._id === user?._id;

  return (
    <>
      <div className="message flex items-center gap-2">
        <span>{message.content}</span>

        {/* Only report others' messages */}
        {!isOwnMessage && (
          <button
            onClick={() => setOpenReport(true)}
            className="text-xs text-red-500 hover:underline"
          >
            Report
          </button>
        )}
      </div>

      <ReportModal
        open={openReport}
        onClose={() => setOpenReport(false)}
        reportedUserId={message.sender._id}
        context={{
        messageId: message._id,
        chatId: message.chat
        }}
      />
    </>
  );
};

export default MessageItem;
