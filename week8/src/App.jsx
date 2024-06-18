import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PopularPage from './pages/PopularPage';
import MainPage from './pages/MainPage';
import NowPlayingPage from './pages/NowPlayingPage';
import TopRatedPage from './pages/TopRatedPage';
import UpComingPage from './pages/UpComingPage';
import MovieDetailPage from './pages/MovieDetailPage';
import NotFound from './pages/NotFoundPage';
import SignUp from './pages/SignUpPage';
import LogIn from './pages/LogInPage'
import './App.css';

function App() {
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
          <Route path="/movie/:movieId" element={<MovieDetailPage />} />
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
