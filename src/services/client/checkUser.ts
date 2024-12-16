import { clientAPI } from "../clientAxios";
import { toast } from "react-toastify";

export const getClientUser = async () => {
  const statusError = 200;
  try {
    const response = await clientAPI.get(`/api/as/app/client`);

    if (response.status !== statusError) {
      throw new Error("Server responded with a non-2xx status code.");
    }

    const data = response.data;

    return {
      data,
    };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.msg || "An unexpected error occurred.";
    toast.error(errorMessage);
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
      return null;
    }
    new Error(`Server responded with a non-2xx status code: ${error}`);
    return null;
  }
};
