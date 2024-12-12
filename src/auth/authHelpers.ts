import { redirect } from "next/navigation"; // Import redirect for server-side navigation
import { toast } from "react-toastify";

/**
 * Handles unauthorized access by clearing localStorage and performing additional actions.
 */
export const handleUnauthorizedError = () => {
  // Clear all items from localStorage
  if (typeof window !== "undefined") {
    localStorage.clear();
  };

  // Show a toast notification for session expiration
  toast.error("Your session has expired. Redirecting to login...");

  // Redirect to login page
  redirect("/login");
};
