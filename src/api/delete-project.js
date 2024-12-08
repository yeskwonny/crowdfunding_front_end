async function deleteProject(id) {
  const url = `${import.meta.env.VITE_API_URL}/projects/${id}`;
  const token = window.localStorage.getItem("token");
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    if (response.status === 204) {
      return {
        success: true,
        message: `Project with ID ${id} was deleted successfully.`,
      };
    }

    const data = await response.json();
    return {
      success: false,
      message: data.detail || "Failed to delete the project.",
    };
  } catch (error) {
    console.error(`Error deleting project with ID ${id}:`, error.message);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export default deleteProject;
