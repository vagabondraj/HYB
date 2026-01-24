import { useEffect, useState } from "react";
import { reportAPI } from "../../api/Report.api.js";
import ReportTable from "../../components/reports/ReportTable.jsx";
import ReportFilters from "../../components/reports/ReportFilters.jsx";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await reportAPI.getAll({ status });
      setReports(res.data.reports);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [status]);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">User Reports</h1>

      <ReportFilters status={status} setStatus={setStatus} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ReportTable reports={reports} onRefresh={fetchReports} />
      )}
    </div>
  );
};

export default Reports;
