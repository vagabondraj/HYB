import { useState } from "react";
import { REPORT_REASON } from "../../utils/constants.js";
import { reportAPI } from "../../api/Report.api.js";
import Toast from "../Toast.jsx";

const ReportModal = ({ isOpen, onClose, reportedUserId }) => {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!reason || !description) {
      Toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await reportAPI.create({
        reportedUserId,
        reason,
        description,
      });

      Toast.success("Report submitted successfully");
      onClose();
      setReason("");
      setDescription("");
    } catch (err) {
      Toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-gray-900">
        <h2 className="mb-4 text-lg font-semibold">Report User</h2>

        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mb-3 w-full rounded border p-2 dark:bg-gray-800"
        >
          <option value="">Select reason</option>
          {REPORT_REASON.map((r) => (
            <option key={r} value={r}>
              {r.replace("_", " ")}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Describe the issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4 w-full rounded border p-2 dark:bg-gray-800"
          rows={4}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded bg-red-600 px-4 py-2 text-sm text-white"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
