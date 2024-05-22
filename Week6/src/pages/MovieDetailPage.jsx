import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';


const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://image.tmdb.org/t/p/original${props => props.poster}');
  background-size: cover;
  background-position: center;
  z-index: -1;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(33, 35, 72, 0.85);
    z-index: -1;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const Content = styled.div`
  padding-left: 500px;
  padding-right: 500px;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

const Poster = styled.img`
  width: 400px; 
  margin-right: 50px; 
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-height: 500px;
  color: white;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Rating = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ReleaseDate = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`;

const Synopsis = styled.p`
  font-size: 18px;
  color: white;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  height: 100vh;
  background-color: #212348;
`;

function MovieDetailPage() {
  const { movieTitle } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const encodedTitle = encodeURIComponent(movieTitle);
      const base_url = `https://api.themoviedb.org/3/search/movie?api_key=42b8be23d71ac7e304fe02f1f4e720da&query=${encodedTitle}&page=1`;
  
      try {
        const koResponse = await fetch(`${base_url}&language=ko-KR`);
        const koData = await koResponse.json();
        const enResponse = await fetch(`${base_url}&language=en-US`);
        const enData = await enResponse.json();
  
        if (koData.results.length > 0 && enData.results.length > 0) {
          const movieDetails = {
            ...koData.results[0],
            title: enData.results[0].title 
          };
          setMovie(movieDetails);
        } else {
          navigate("/not-found");
        }
      } catch (error) {
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    };
  
    fetchMovie();
  }, [movieTitle, navigate]);

  if (loading) {
    return <LoaderContainer><BeatLoader color="#ffffff" size={15} /></LoaderContainer>;
  }

  if (!movie) {
    return <LoaderContainer><BeatLoader color="#ffffff" size={15} /></LoaderContainer>;
  }

  const renderStars = (rating) => {
    const stars = Math.floor(rating);
    return '⭐'.repeat(stars);
  };

  return (
    <>
      <Background poster={movie.poster_path} />
      <Container>
        <Content>
          <Poster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <Details>
            <Title>{movie.title}</Title>
            <Rating>평점 {renderStars(movie.vote_average)}</Rating>
            <ReleaseDate>개봉일 {movie.release_date}</ReleaseDate>
            <Synopsis>줄거리<br/><br/>{movie.overview ? movie.overview : "줄거리 정보가 없습니다."}</Synopsis>
          </Details>
        </Content>
      </Container>
    </>
  );
}

export default MovieDetailPage;
