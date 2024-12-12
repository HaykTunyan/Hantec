import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://uatcms999.hantecfinancial.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export async function getLocalLangages<T>({ lang }: { lang: string }): Promise<T> {
  try {
    const response: AxiosResponse<T> = await api.get(`/client-center/locales/${lang}/translation.json`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Failed to fetch local US data due to server error");
    } else {
      throw new Error("Failed to fetch local US data");
    }
  }
}
