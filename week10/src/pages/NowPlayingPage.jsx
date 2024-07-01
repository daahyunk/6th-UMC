import { useRef, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, MoviesGrid, MovieCard, Image, Info, Title, Rating } from '../components/style/styles';
import useMovies from '../components/api/useMovies';
import { BeatLoader } from 'react-spinners';

const NowPlayingPage = () => {
  const [page, setPage] = useState(1);
  const { movies, loading, hasMore } = useMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=42b8be23d71ac7e304fe02f1f4e720da&language=en-US`, page);

  const observer = useRef();

  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <Container>
      <MoviesGrid>
        {movies.map((movie, index) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} ref={index === movies.length - 1 ? lastMovieElementRef : null}>
            <MovieCard>
              <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <Info>
                <Title>{movie.title}</Title>
                <Rating>⭐ {movie.vote_average.toFixed(1)}</Rating>
              </Info>
            </MovieCard>
          </Link>
        ))}
      </MoviesGrid>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', backgroundColor: "#212348" }}>
          <BeatLoader color="#ffffff" size={15} />
        </div>
      )}
    </Container>
  );
};

export default NowPlayingPage;
