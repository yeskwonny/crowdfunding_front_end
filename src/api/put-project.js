export async function updateProject(
  id,
  title,
  director,
  genres,
  image,
  movie_synopsis,
  goal,
  is_open,
  goal_deadline
) {
  const url = `${import.meta.env.VITE_API_URL}/projects/${id}`;
  const token = window.localStorage.getItem("token");

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify({
        title,
        director,
        genres,
        image,
        movie_synopsis,
        goal,
        is_open,
        goal_deadline,
      }),
    });

    if (!response.ok) {
      const fallbackError = "Error trying to update a project";

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
    console.error("Error trying to update the project:", error.message);
    throw new Error(error.message || "An unexpected error occurred.");
  }
}
