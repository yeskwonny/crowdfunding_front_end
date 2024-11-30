import { useState, useEffect } from "react";
import postSignUp from "../api/post-signup.js";

export default function useUser(username, password) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    postSignUp(username, password).then((res) => console.log(res));
  }, []);

  return { user, isLoading, error };
}
