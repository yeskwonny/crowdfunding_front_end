import { useState, useEffect } from "react";
import getProjects from "../api/get-projects.js";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, []);

  return { projects, isLoading, error };
}
