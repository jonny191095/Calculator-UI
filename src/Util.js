import { useState, useEffect } from "react";

export const useFetch = (url, body) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            var options = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: body
              };
      
            try {
              const response = await fetch(url, options);
              
              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.error || "Unknown error"}`);
              }
      
              const result = await response.json();
              setResult(result);
            } catch (error) {
              setError(error.message);
              setResult(null);
            } finally {
              setLoading(false);
            }
        };

        fetchData();
      }, [url, body]);
    
      return { result, loading, error };
    };