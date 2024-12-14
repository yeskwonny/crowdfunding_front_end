async function getProjects() {
  const url = `${import.meta.env.VITE_API_URL}/projects/`;
  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      const fallbackError = "Error fetching projects";
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
      const errorMsg = data?.detail ?? fallbackError;
      throw new Error(errorMsg);
    }
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error("Failed to fetch projects:", error.message);
    throw error;
  }
}

export default getProjects;
