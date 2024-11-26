async function postLogin(username, password) {
  const url = `${import.meta.env.VITE_API_URL}/api-token-auth/`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });

    if (!response.ok) {
      const fallbackError = "Error trying to Login";
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
      const errorMsg = data?.detail ?? fallbackError;
      throw new Error(errorMsg);
    }
    return await response.json();
  } catch (error) {
    console.error("Error during login:", error.message);
    throw new Error(error.message || "An unexpected error occurred.");
  }
}
export default postLogin;
