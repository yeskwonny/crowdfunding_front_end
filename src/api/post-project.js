async function postCreateProject(
  title,
  director,
  genres,
  synopsis,
  is_open,
  target,
  targetdDate
) {
  const url = `${import.meta.env.VITE_API_URL}/projects/`;

  const token = window.localStorage.getItem("token");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify({
        title,
        director,
        genres,
        movie_synopsis: synopsis,
        is_open,
        goal: target,
        goal_deadline: targetdDate,
      }),
    });

    if (!response.ok) {
      const fallbackError = "Error trying to create a project";

      try {
        const data = await response.json();
        const errorMsg = data?.detail ?? fallbackError;
        throw new Error(errorMsg);
      } catch (parseError) {
        console.error("API Error Response:", data);
        throw new Error(fallbackError);
      }
    }

    return await response.json();
  } catch (error) {
    console.error("Error trying to create a project:", error.message);
    throw new Error(error.message || "An unexpected error occurred.");
  }
}

export default postCreateProject;
