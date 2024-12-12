// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import axios from "axios";

// Define your custom login function
const loginUser = async (loginData: { type: string; companyId: number; applicationId: number; loginId: string; password: string; }) => {
  try {
    const response = await axios.post("/api/login", loginData);
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore check
      authorize: async (credentials) => {
        if (!credentials) return null;

        const loginData = {
          type: "PASSWORD",
          companyId: 20,
          applicationId: 9,
          loginId: credentials.username,
          password: credentials.password,
        };

        try {
          const responseData = await loginUser(loginData);
          if (responseData.status === "success") {
            const user = {
              id: responseData.data.id,
              name: responseData.data.name,
              email: responseData.data.email,
            };
            return user;
          } else {
            return null;
          }
        } catch (error) {
          if(error) {
            new Error("Error during login:", error);
            return null;
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
