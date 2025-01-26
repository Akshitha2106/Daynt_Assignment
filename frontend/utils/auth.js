export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("authToken");
  }
  return false;
};
