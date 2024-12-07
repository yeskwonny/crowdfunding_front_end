async function getUsers() {
  const url = `${import.meta.env.VITE_API_URL}/users/`;
  try {
    const response = await fetch(url, { method: "GET" });
    console.log(response);
    if (!response.ok) {
      const fallbackError = "Error fetching users";
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
      const errorMsg = data?.detail ?? fallbackError;
      throw new Error(errorMsg);
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error.message);
    throw error;
  }
}

export default getUsers;
