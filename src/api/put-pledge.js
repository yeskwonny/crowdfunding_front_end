export async function putPledge(id, project, amount, comment, anonymous) {
  const url = `${import.meta.env.VITE_API_URL}/pledges/${id}`;
  const token = window.localStorage.getItem("token");

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify({
        id,
        project,
        amount,
        comment,
        anonymous,
      }),
    });

    if (!response.ok) {
      const fallbackError = "Error trying to update the pledge";

      try {
        const data = await response.json();
        console.log(data);
        const errorMsg = data?.detail ?? fallbackError;
        throw new Error(errorMsg);
      } catch (parseError) {
        console.error("API Error Response:", data);
        throw new Error(fallbackError);
      }
    }

    return await response.json();
  } catch (error) {
    console.error("Error trying to update the pledge:", error.message);
    throw new Error(error.message || "An unexpected error occurred.");
  }
}
