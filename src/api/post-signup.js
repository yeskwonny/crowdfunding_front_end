async function postSignUp(username, password) {
  const url = `${import.meta.env.VITE_API_URL}/users/`;

  console.log("Request URL:", url); // URL 디버깅
  console.log("Request Body:", { username, password }); // 요청 본문 디버깅

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    console.log("Response status:", response.status); // 상태 코드 확인

    if (!response.ok) {
      const fallbackError = "Error trying to Signup";

      try {
        const data = await response.json(); // JSON 파싱 시도
        const errorMsg = data?.detail ?? fallbackError;
        throw new Error(errorMsg);
      } catch (parseError) {
        throw new Error(fallbackError); // JSON 파싱 실패 시
      }
    }

    return await response.json(); // 성공적으로 JSON 반환
  } catch (error) {
    console.error("Error during signup:", error.message);
    throw new Error(error.message || "An unexpected error occurred.");
  }
}

export default postSignUp;
