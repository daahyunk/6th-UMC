import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PopularPage from './pages/PopularPage';
import MainPage from './pages/MainPage';
import NowPlayingPage from './pages/NowPlayingPage';
import TopRatedPage from './pages/TopRatedPage';
import UpComingPage from './pages/UpComingPage';
import MovieDetailPage from './pages/MovieDetailPage';
import useMovies from './components/api/useMovies'; 
import NotFound from './pages/NotFoundPage';
import SignUp from './pages/SignUpPage';
import LogIn from './pages/LogInPage'
import './App.css';

function App() {
  const { movies } = useMovies('https://api.themoviedb.org/3/movie/popular?api_key=42b8be23d71ac7e304fe02f1f4e720da&language=en-US&page=1');

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/nowplaying" element={<NowPlayingPage />} />
          <Route path="/toprated" element={<TopRatedPage />} />
          <Route path="/upcoming" element={<UpComingPage />} />
          <Route path="/movie/:movieTitle" element={<MovieDetailPage movies={movies} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
