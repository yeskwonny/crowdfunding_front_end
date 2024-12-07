import { useState, useEffect } from "react";
import getPledge from "../api/get-pledge.js";

export default function usePledge(id) {
  const [pledge, setPledge] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPledge(id);
        setPledge(data);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { pledge, isLoading, error };
}
