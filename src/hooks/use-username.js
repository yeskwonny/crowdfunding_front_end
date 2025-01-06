import { useState, useEffect } from "react";
import getUsernameById from "../api/get-username.js";

export default function useUsers(id) {
  const [username, setUserName] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsernameById(id);
        setUserName(data);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return { username, isLoading, error };
}
