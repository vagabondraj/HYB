import { Check, X, AlertCircle } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  const icons = {
    success: <Check size={20} />,
    error: <X size={20} />,
    info: <AlertCircle size={20} />
  };

  const styles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg 
      ${styles[type] || styles.success} 
      text-white font-medium animate-slide-in flex items-center gap-3`}
    >
      {icons[type] || icons.success}

      <span className="flex-1">{message}</span>

      <button
        onClick={onClose}
        className="hover:opacity-80 transition"
        aria-label="Close toast"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
