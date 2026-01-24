import { useState } from "react";
import ReportModal from "../reports/ReportModal";

const MessageItem = ({ message }) => {
  const [openReport, setOpenReport] = useState(false);

  return (
    <>
      <div className="message">
        {message.text}

        <button
          onClick={() => setOpenReport(true)}
          className="ml-2 text-sm text-red-500"
        >
          Report
        </button>
      </div>

      <ReportModal
        open={openReport}
        onClose={() => setOpenReport(false)}
        reportedUserId={message.sender._id}
      />
    </>
  );
};

export default MessageItem;
