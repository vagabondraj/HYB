import { REPORT_STATUS } from "../../utils/constant.js";

const ReportFilters = ({ status, setStatus }) => {
  return (
    <div className="mb-4 flex gap-3">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded border p-2"
      >
        <option value="">All Status</option>
        {REPORT_STATUS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ReportFilters;
