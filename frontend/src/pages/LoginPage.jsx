import { useState } from "react";
import useToast from "../hooks/useToast.js";
import Toast from "../components/Toast.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function LoginPage() {
  const { toast, showToast, hideToast } = useToast();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const result = await login(email, password);
      setLoading(false);

      if (result.success) {
        showToast("Login successful");
      } else {
        showToast(result.error || "Invalid credentials", "error");
      }
    } catch {
      setLoading(false);
      showToast("Something went wrong", "error");
    }
  };

  return (
    <>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </>
  );
}

export default LoginPage;
