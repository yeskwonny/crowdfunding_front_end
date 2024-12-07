import { useState, useEffect } from "react";
import getPledges from "../api/get-pledges.js";

export default function useProjects() {
  const [pledges, setPledges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPledges = async () => {
      try {
        const data = await getPledges();
        setPledges(data);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPledge();
  }, []);

  return { pledges, isLoading, error };
}
