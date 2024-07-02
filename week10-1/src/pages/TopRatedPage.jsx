import { Link } from 'react-router-dom';
import { Container, MovieCard, Image, Info, Title, Rating, MoviesGrid } from '../components/style/styles';
import useMovies from '../components/api/useMovies';
import { BeatLoader } from 'react-spinners';

const TopRatedPage = () => {
  const { movies, loading } = useMovies(`https://api.themoviedb.org/3/movie/top_rated?api_key=42b8be23d71ac7e304fe02f1f4e720da&language=en-US&page=1`);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: "#212348" }}>
        <BeatLoader color="#ffffff" size={15} />
      </div>
    );
  }

  return (
    <Container>
      <MoviesGrid>
        {movies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
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
    </Container>
  );
};

export default TopRatedPage;
