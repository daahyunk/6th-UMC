import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';

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
  padding-top: 20vh;
  padding-bottom: 21vh;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 10vh;
    padding-bottom: 10vh;
  }
`;

const Content = styled.div`
  padding-left: 500px;
  padding-right: 500px;
  border-radius: 10px;
  display: flex;
  align-items: center;

  @media (max-width: 1200px) {
    padding-left: 100px;
    padding-right: 100px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const Poster = styled.img`
  width: 400px;
  margin-right: 50px;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-height: 500px;
  color: white;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
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

const CastContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1a40;
  margin-top: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const CastTitle = styled.h2`
  font-size: 1.5rem;
  color: white;
  margin-top: 3vh;
  margin-bottom: 3vh;
`;

const CastGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
`;

const CastCard = styled.div`
  width: 150px;
  margin: 10px;
  text-align: center;
  color: white;

  @media (max-width: 768px) {
    width: 120px;
  }
`;

const CastImage = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 120px;
  }
`;

const CastName = styled.div`
  font-size: 16px;
  margin-top: 5px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const CastRole = styled.div`
  font-size: 14px;
  color: yellow;
  margin-top: 3px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=42b8be23d71ac7e304fe02f1f4e720da&language=ko-KR`);
        const castResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=42b8be23d71ac7e304fe02f1f4e720da&language=ko-KR`);
        setMovie(response.data);
        setCast(castResponse.data.cast);
      } catch (error) {
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId, navigate]);

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
      <CastContainer>
        <CastTitle>출연진 및 제작진</CastTitle>
        <CastGrid>
          {cast.map(member => (
            <CastCard key={member.id}>
              <CastImage
                src={member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s'}
                alt={member.name}
              />
              <CastName>{member.name}</CastName>
              <CastRole>{member.character}</CastRole>
            </CastCard>
          ))}
        </CastGrid>
      </CastContainer>
    </>
  );
}

export default MovieDetailPage;
