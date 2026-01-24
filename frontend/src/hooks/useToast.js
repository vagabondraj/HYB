import { useState, useCallback } from "react";

const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(
    (message, type = "success", duration = 3000) => {
      setToast({ message, type });

      setTimeout(() => {
        setToast(null);
      }, duration);
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    toast,
    showToast,
    hideToast,
  };
};

export default useToast;
