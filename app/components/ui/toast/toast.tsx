import toast, { Toaster as HotToaster } from "react-hot-toast";

export const Toaster = () => {
  return (
    <HotToaster
      position="bottom-right"
      toastOptions={{
        duration: 6000,
        style: {
          borderRadius: "1rem",
          boxShadow: "none",
          border: "1px solid #e0e0e0",
          padding: "1rem 2rem",
          fontSize: "1.4rem",
        },
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      }}
    />
  );
};

/**
 * Show a success toast notification
 */
export const showSuccessToast = (message: string) => {
  toast.success(message);
};

/**
 * Show an error toast notification
 */
export const showErrorToast = (message: string) => {
  toast.error(message, {
    ariaProps: { role: "alert", "aria-live": "assertive" },
  });
};
