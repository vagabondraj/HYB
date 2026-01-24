const colors = {
  pending: "bg-yellow-100 text-yellow-700",
  reviewed: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  dismissed: "bg-red-100 text-red-700",
};

const ReportStatusBadge = ({ status }) => {
  return (
    <span
      className={`rounded px-2 py-1 text-xs font-medium ${
        colors[status] || ""
      }`}
    >
      {status}
    </span>
  );
};

export default ReportStatusBadge;
