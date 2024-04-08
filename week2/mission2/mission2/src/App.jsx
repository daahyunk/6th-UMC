import { movies } from './movieDummy';
import Movie from './components/Movie';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {movies.results.map((item) => (
        <Movie key={item.id} movieData={item} />
      ))}
    </div>
  );
}

export default App;