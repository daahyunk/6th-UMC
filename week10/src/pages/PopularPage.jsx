import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, MoviesGrid, MovieCard, Image, Info, Title, Rating, PaginationContainer, PaginationButton, PageNumber } from '../components/style/styles';
import useMovies from '../components/api/useMovies';
import { BeatLoader } from 'react-spinners';

const PopularPage = () => {
  const [page, setPage] = useState(1);
  const { movies, loading, hasMore } = useMovies(`https://api.themoviedb.org/3/movie/popular?api_key=42b8be23d71ac7e304fe02f1f4e720da&language=en-US`, page);

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (hasMore) setPage(page + 1);
  };

  return (
    <Container>
      {loading && page === 1 ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: "#212348" }}>
          <BeatLoader color="#ffffff" size={15} />
        </div>
      ) : (
        <>
          <MoviesGrid>
            {movies.map((movie) => (
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
          <PaginationContainer>
            <PaginationButton onClick={handlePreviousPage} disabled={page === 1}>
              &lt;
            </PaginationButton>
            <PageNumber>{page}</PageNumber>
            <PaginationButton onClick={handleNextPage}>
              &gt;
            </PaginationButton>
          </PaginationContainer>
        </>
      )}
      {loading && page > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', backgroundColor: "#212348" }}>
          <BeatLoader color="#ffffff" size={15} />
        </div>
      )}
    </Container>
  );
};

export default PopularPage;
