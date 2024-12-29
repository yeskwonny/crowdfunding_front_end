async function postPledge(project, amount, comment, anonymous) {
  const url = `${import.meta.env.VITE_API_URL}/pledges/`;
  const token = window.localStorage.getItem("token");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify({
        project,
        amount,
        comment,
        anonymous,
      }),
    });

    if (!response.ok) {
      const fallbackError = "Error trying to create a pledge";
      let errorData;

      try {
        errorData = await response.json();
        console.log(errorData);
      } catch (parseError) {
        errorData = { detail: fallbackError };
      }
      throw { message: errorData?.detail || fallbackError, data: errorData };
    }

    return await response.json();
  } catch (error) {
    console.error("Error trying to create a pledge:", error.message);
    throw error; // Re-throw the error to handle it in the calling component.
  }
}

export default postPledge;
