import { useState, useEffect } from 'react';

const useMovies = (url) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      
      setTimeout(() => {
        setMovies(data.results);
        setLoading(false);
      }, 1000);
    };

    fetchMovies();
  }, [url]);

  return { movies, loading };
};

export default useMovies;
