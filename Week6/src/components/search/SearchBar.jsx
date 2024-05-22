import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  width: 250px;
  margin: 10px;
  text-align: center;
  color: white;
  background-color: #373B66;
  border-radius: 5px;
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

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (query.trim() === '') return;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=42b8be23d71ac7e304fe02f1f4e720da&query=${query}&language=ko-KR`
      );
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  useEffect(() => {
    // 검색어가 변경될 때마다 실행
    const timeoutId = setTimeout(() => {
      if (query.trim() !== '') {
        handleSearch(); // 검색어가 비어있지 않으면 검색 함수 호출
      } else {
        setResults([]); // 검색어가 비어있으면 결과 초기화
      }
    }, 500); // 500ms 디바운스 적용

    return () => clearTimeout(timeoutId); // 컴포넌트 언마운트 시 타이머 정리
  }, [query]); // 의존성 배열에 query 추가

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
      {query.trim() !== '' && results.length > 0 && (
        <ResultsContainer>
          {results.map((movie) => (
            <MovieCard key={movie.id}>
              <MovieImage
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieRating>⭐ {movie.vote_average}</MovieRating>
            </MovieCard>
          ))}
        </ResultsContainer>
      )}
    </SearchBarContainer>
  );
};

export default SearchBar;
