import axios from "axios";
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: "https://api.bigdatacloud.net/data",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

interface GeoCodeClientProps {
  latitude: number;
  longitude: number;
  localityLanguage: string;
}

export async function getGeoCodeClient(
  props: GeoCodeClientProps
): Promise<GeoCodeClientProps> {
  const { latitude, longitude, localityLanguage } = props;
  try {
    const response = await api.get<GeoCodeClientProps>(
      `/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${localityLanguage}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.msg || "Failed to fetch user overview";
      toast.error(errorMessage);
      throw new Error("Failed to fetch user overview due to server error");
    } else {
      throw new Error("Failed to fetch user overview");
    }
  }
}
