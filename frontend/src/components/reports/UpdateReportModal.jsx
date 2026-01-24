import { useState } from "react";
import { REPORT_STATUS } from "../../utils/constant.js";
import { reportAPI } from "../../api/Report.api.js";

const UpdateReportModal = ({ report, onClose, onUpdated }) => {
  const [status, setStatus] = useState(report.status);
  const [reviewNotes, setReviewNotes] = useState("");

  const handleUpdate = async () => {
    try {
      await reportAPI.update(report._id, {
        status,
        reviewNotes,
      });
      alert("Report updated");
      onUpdated();
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Review Report</h2>

        <select
          className="mb-3 w-full border p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {REPORT_STATUS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Review notes"
          className="mb-4 w-full border p-2"
          rows={3}
          value={reviewNotes}
          onChange={(e) => setReviewNotes(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleUpdate}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateReportModal;
