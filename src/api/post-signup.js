async function postSignUp(username, password, email, firstname, lastname) {
  const url = `${import.meta.env.VITE_API_URL}/users/`;

  console.log("Request URL:", url);
  console.log("Request Body:", {
    username,
    password,
    email,
    firstname,
    lastname,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        email,
        first_name: firstname,
        last_name: lastname,
      }),
    });

    console.log("Response status:", response.status); 

    if (!response.ok) {
      const fallbackError = "Error trying to Signup";

      try {
        const data = await response.json(); 
        const errorMsg = data?.detail ?? fallbackError;
        throw new Error(errorMsg);
      } catch (parseError) {
        throw new Error(fallbackError); 
      }
    }

    return await response.json(); 
  } catch (error) {
    console.error("Error during signup:", error.message);
    throw new Error(error.message || "An unexpected error occurred.");
  }
}

export default postSignUp;
