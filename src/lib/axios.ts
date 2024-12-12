// Lib For all Endpoints Instance.

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://rinex-portal-uat.hantecgroup.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
