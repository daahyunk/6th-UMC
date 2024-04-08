import { MovieContainer, MovieInfo, Overview } from './Movie.style';
import PropTypes from 'prop-types';

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

Movie.propTypes = {
    movieData: PropTypes.shape({
      poster_path: PropTypes.string,
      title: PropTypes.string.isRequired,
      vote_average: PropTypes.number,
      overview: PropTypes.string
    }).isRequired
  };

function Movie(props) {
    
    return (
    
        <MovieContainer>
            <img src={`${IMG_BASE_URL}${props.movieData.poster_path}`} alt="영화 포스터" />
            <MovieInfo>
                <h4>{props.movieData.title}</h4>
                <span>{props.movieData.vote_average}</span>
            </MovieInfo>

            <Overview>
                <h4>{props.movieData.title}</h4>
                <p>{props.movieData.overview}</p>
            </Overview>
        </MovieContainer>
    );
  }
  
  export default Movie;