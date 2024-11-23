async function getProject(id) {
  const url = `${import.meta.env.VITE_API_URL}/projects/${id}`;
  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      const fallbackError = `Error fetching projects with id ${id}`;
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
      const errorMsg = data?.detail ?? fallbackError;
      throw new Error(errorMsg);
    }
    const project = await response.json();
    return project;
  } catch (error) {
    console.error(`Failed to fetch project with id ${id}:`, error.message);
    throw error;
  }
}

export default getProject;
