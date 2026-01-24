import useToast from '../hooks/useToast';
import Toast from '../components/Toast.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function LoginPage() {
  const { toast, showToast, hideToast } = useToast();
  const {login} = useAuth();
  const handleLogin = async () => {
    try {
      await login();
      showToast('Login successful');
    } catch (err) {
      showToast('Invalid credentials', 'error');
    }
  };

  return (
    <>
      <button onClick={handleLogin}>Login</button>
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
