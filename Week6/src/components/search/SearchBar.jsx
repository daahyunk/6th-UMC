import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white;
  background-color: #212348;
  padding-bottom: 150px;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 40px;
`;

const SearchInput = styled.input`
  width: 400px;
  padding: 15px;
  font-size: 16px;
  border: none;
  border-radius: 50px;
  outline: none;
`;

const SearchButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #1e2125;
  color: yellow;
  font-size: 16px;
  border-radius: 20px;
  cursor: pointer;
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  max-height: 700px;
  overflow-y: auto;
  width: 60%;
  background-color: #171B39;
  border-radius: 10px;
  padding: 20px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1e2125;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: yellow;
    border-radius: 10px;
  }
`;

const MovieCard = styled.div`
  position: relative;
  width: 250px;
  margin: 10px;
  text-align: center;
  color: white;
  background-color: #373B66;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;

  &:hover .overlay {
    opacity: 1;
  }
`;

const MovieImage = styled.img`
  width: 100%;
  height: 380px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const MovieTitle = styled.div`
  font-size: 16px;
  margin-top: 5px;
  font-weight: 600;
`;

const MovieRating = styled.div`
  font-size: 12px;
  color: yellow;
  margin-top: 3px;
  margin-bottom: 10px;
`;

const Loader = styled.div`
  color: white;
  margin-top: 20px;
  font-size: 18px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;  /* 왼쪽 정렬로 변경 */
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  padding: 20px;
`;

const OverlayTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;  /* 왼쪽 정렬로 변경 */
`;

const OverlaySynopsis = styled.div`
  font-size: 14px;
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* 표시할 줄 수 */
  -webkit-box-orient: vertical;
  text-align: left;  /* 왼쪽 정렬로 변경 */
`;

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (query.trim() === '') return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=42b8be23d71ac7e304fe02f1f4e720da&query=${query}&language=ko-KR`
      );
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim() !== '') {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <SearchBarContainer>
      <Title>🎥 Find your Movies!</Title>
      <SearchInput
        type="text"
        placeholder="영화를 검색해 보세요!"
        value={query}
        onChange={handleInputChange}
      />
      <SearchButton onClick={handleSearch}>Search</SearchButton>
      {loading ? (
        <Loader>데이터를 받아오는 중입니다...</Loader>
      ) : (
        query.trim() !== '' && results.length > 0 && (
          <ResultsContainer>
            {results.map((movie) => (
              <MovieCard key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                <MovieImage
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <MovieTitle>{movie.title}</MovieTitle>
                <MovieRating>⭐ {movie.vote_average}</MovieRating>
                <Overlay className="overlay">
                  <OverlayTitle>{movie.title}</OverlayTitle>
                  <OverlaySynopsis>{movie.overview || "줄거리 정보가 없습니다."}</OverlaySynopsis>
                </Overlay>
              </MovieCard>
            ))}
          </ResultsContainer>
        )
      )}
    </SearchBarContainer>
  );
};

export default SearchBar;
