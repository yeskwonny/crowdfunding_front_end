import { useState, useEffect } from "react";
import getProject from "../api/get-project.js";

export default function useProject(id) {
  const [project, setProject] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getProject(id)
      .then((project) => {
        setProject(project);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return { project, isLoading, error };
}
