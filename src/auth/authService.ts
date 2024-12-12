export const isAuthenticated = () => {
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }
  return accessToken !== null && accessToken !== undefined;
};
