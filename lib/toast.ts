import { toast } from 'sonner';

// Toast utility functions
export const showSuccessToast = (message: string) => {
  toast.success(message);
};

export const showErrorToast = (message: string) => {
  toast.error(message);
};

export const showInfoToast = (message: string) => {
  toast.info(message);
};

export const showWarningToast = (message: string) => {
  toast.warning(message);
};

// Function to show a toast and then perform an action after a delay
export const showToastAndThen = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning',
  callback: () => void,
  delay = 2000
) => {
  const toastFn = {
    success: toast.success,
    error: toast.error,
    info: toast.info,
    warning: toast.warning,
  }[type];

  toastFn(message);

  setTimeout(() => {
    callback();
  }, delay);
};
