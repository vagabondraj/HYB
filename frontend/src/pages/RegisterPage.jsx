import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import useToast from "../hooks/useToast.js";
import Toast from "../components/Toast.jsx";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast, showToast, hideToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    branch: "",
    year: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const result = await register(formData);
    setLoading(false);

    if (result.success) {
      navigate("/home"); // ensure this route exists
    } else {
      showToast(result.error || "Registration failed", "error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6 py-12 dark:bg-neutral-900">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <Heart
            size={48}
            fill="currentColor"
            className="mx-auto mb-4 text-primary-600"
          />
          <h1 className="mb-3 text-4xl font-bold text-neutral-900 dark:text-white">
            Join HYB
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300">
            Create your account and start helping
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-2xl dark:border-neutral-700 dark:bg-neutral-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                Full Name
              </label>
              <input
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="input"
                placeholder="Ravi Raj"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                Username
              </label>
              <input
                name="userName"
                required
                value={formData.userName}
                onChange={handleChange}
                className="input"
                placeholder="Raj"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                College Email
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder="your.email@college.edu"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="input"
                placeholder="••••••••"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Branch
                </label>
                <input
                  name="branch"
                  required
                  value={formData.branch}
                  onChange={handleChange}
                  className="input"
                  placeholder="CSE"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Year
                </label>
                <input
                  name="year"
                  type="number"
                  min="1"
                  max="5"
                  required
                  value={formData.year}
                  onChange={handleChange}
                  className="input"
                  placeholder="3"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-neutral-600 dark:text-neutral-400">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="font-bold text-primary-600 hover:underline dark:text-primary-400"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
