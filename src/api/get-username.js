async function getUsernameById(id) {
  const url = `${import.meta.env.VITE_API_URL}/user/id/${id}`;
  try {
    const response = await fetch(url, { method: "GET" });
    console.log(response);
    if (!response.ok) {
      const fallbackError = "Error fetching user's name";
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
      const errorMsg = data?.detail ?? fallbackError;
      throw new Error(errorMsg);
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Failed to fetch username:", error.message);
    throw error;
  }
}

export default getUsernameById;
