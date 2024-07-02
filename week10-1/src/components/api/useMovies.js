import { useState, useEffect } from 'react';

const useMovies = (initialUrl, page) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const response = await fetch(`${initialUrl}&page=${page}`);
      const data = await response.json();
      
      setMovies(prevMovies => [...prevMovies, ...data.results]);
      setHasMore(data.page < data.total_pages);
      setLoading(false);
    };

    fetchMovies();
  }, [initialUrl, page]);

  return { movies, loading, hasMore };
};

export default useMovies;
