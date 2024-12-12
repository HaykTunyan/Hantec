export const isAuthenticated = async (): Promise<boolean> => {
  try {
    // Check for tokens in localStorage
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      return false;
    }

    // Optionally, make an API call to verify the access token
    // Here is an example using a hypothetical endpoint
    const response = await fetch("/api/auth/verify", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.isAuthenticated;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
