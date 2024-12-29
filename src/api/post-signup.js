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

    if (!response.ok) {
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json(); // JSON 응답 처리
        throw errorData;
      } else {
        // HTML 또는 다른 형식의 응답 처리
        const errorText = await response.text();
        throw new Error(`Unexpected response: ${errorText}`);
      }
    }

    return await response.json(); // 성공한 응답 반환
  } catch (error) {
    console.error("Error in postSignUp:", error);
    throw error;
  }
}

export default postSignUp;
