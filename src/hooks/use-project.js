import { useState, useEffect } from "react";
import getProject from "../api/get-project.js";

export default function useProject(id) {
  const [project, setProject] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProject(id);
        setProject(data);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { project, isLoading, error };
}
