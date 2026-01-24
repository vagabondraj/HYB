import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import requestsAPI from "../api/request.api.js";
import {
  REQUEST_CATEGORIES,
  URGENCY_LEVELS,
} from "../utils/constant.js";
import Header from "../components/Header.jsx";
import Toast from "../components/Toast.jsx";
import useToast from "../hooks/useToast.js";

const CreateRequestPage = () => {
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "notes",
    urgency: "normal",
    expiryDuration: 24,
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const payload = { ...formData };
      if (image) payload.image = image;

      await requestsAPI.create(payload);

      showToast("Request created successfully!", "success");

      setFormData({
        title: "",
        description: "",
        category: "notes",
        urgency: "normal",
        expiryDuration: 24,
      });
      setImage(null);

      setTimeout(() => navigate("/home"), 1200);
    } catch (error) {
      showToast(
        error?.message || "Failed to create request",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

      <Header />

      <main className="mx-auto max-w-2xl px-6 py-8">
        <button
          onClick={() => navigate("/home")}
          className="mb-8 flex items-center gap-2 font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ChevronLeft size={22} />
          Back to Home
        </button>

        <div className="rounded-3xl border border-neutral-200 bg-white p-10 shadow-2xl dark:border-neutral-700 dark:bg-neutral-800">
          <h1 className="mb-8 text-4xl font-bold text-neutral-900 dark:text-white">
            Create New Request
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                Title *
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input"
                placeholder="What do you need?"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea h-36"
                placeholder="Provide more details..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  {REQUEST_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Urgency *
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  {URGENCY_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                Expires in (hours)
              </label>
              <input
                name="expiryDuration"
                type="number"
                min="1"
                max="168"
                value={formData.expiryDuration}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-neutral-700 dark:text-neutral-300">
                Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="input"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Request"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateRequestPage;
