// pages/api/login.ts

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const apiUrl = process.env.BASE_URL;
const statusCode = 405;

export default async function handlerLoginAPI(req: NextApiRequest, res: NextApiResponse) {
  
    if (req.method !== "POST") {
        return res.status(statusCode).json({ message: "Method Not Allowed" });
    }

    const { loginId, password } = req.body;
    const companyId = 20;
    const applicationId = 9; 

    try {
        const response = await axios.post(`${apiUrl}/api/acs/login`, {
            type: "PASSWORD",
            companyId,
            applicationId,
            loginId,
            password
        });
        if(response){} //check
    } catch (error) {
        if(error) {
            new Error("Error during login:", error);
        }
        // @ts-ignore
        // res.status(error.response?.status || 500).json({ message: "Login failed" });
    }
}
