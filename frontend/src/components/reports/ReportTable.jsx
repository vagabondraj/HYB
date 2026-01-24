import { useState } from "react";
import ReportStatusBadge from "./ReportStatusBadge.jsx";
import UpdateReportModal from "./UpdateReportModal.jsx";

const ReportTable = ({ reports, onRefresh }) => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Reported User</th>
            <th className="border p-2">Reported By</th>
            <th className="border p-2">Reason</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r._id}>
              <td className="border p-2">{r.reportedUser.userName}</td>
              <td className="border p-2">{r.reportedBy.userName}</td>
              <td className="border p-2">{r.reason}</td>
              <td className="border p-2">
                <ReportStatusBadge status={r.status} />
              </td>
              <td className="border p-2">
                <button
                  onClick={() => setSelected(r)}
                  className="text-blue-600"
                >
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <UpdateReportModal
          report={selected}
          onClose={() => setSelected(null)}
          onUpdated={onRefresh}
        />
      )}
    </>
  );
};

export default ReportTable;
