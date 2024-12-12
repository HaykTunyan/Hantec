import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
// import { store } from "../app/store";
// import SnackbarUtils from "../util/SnackbarUtils";
// import { isArgumentNotValid } from "../util/Utils";



const RINEX_API_URL = "https://rinex-portal-uat.hantecgroup.com/api/";

export interface GenericResponseInterface<T = any> {
  status: "success" | "error";
  msg: string;
  rtnCode: string;
  data: T;
}

export class Api {
  public instance: AxiosInstance;

  constructor(baseURL?: string) {
    this.instance = axios.create({
      baseURL,
      timeout: parseInt(process.env.REACT_APP_AXIOS_TIMEOUT || "0"),
    });

    this.instance.interceptors.request.use(function (request: any) {
      return request;
    });

    this.instance.interceptors.response.use(
      function (response: any) {
        return response;
      },
      function (error: AxiosError) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          (error.response?.data as any)?.rtnCode !== "CS-101"
        ) {
          //   SnackbarUtils.error(isArgumentNotValid(error));
        }
        return Promise.reject(error);
      }
    );
  }

  post(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
    return this.instance.post(url, data, {
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  get(url: string, config?: AxiosRequestConfig | undefined) {
    return this.instance.get(url, {
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  delete(url: string, config?: AxiosRequestConfig | undefined) {
    return this.instance.delete(url, {
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  put(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
    return this.instance.put(url, data, {
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
    return this.instance.patch(url, data, {
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }
}

const api = new Api(String(RINEX_API_URL));

export default api;
