async function getPledges() {
  const url = `${import.meta.env.VITE_API_URL}/pledges/`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    console.log(response);
    if (!response.ok) {
      const fallbackError = "Error fetching pledges";
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
      const errorMsg = data?.detail ?? fallbackError;
      throw new Error(errorMsg);
    }
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error("Failed to fetch pledges:", error.message);
    throw error;
  }
}

export default getPledges;
