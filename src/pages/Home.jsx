import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getPopularMovies();
        setMovies(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Error fetching movies. Please try again later.");
      }
      finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) {
      setError("Please enter a search query");
      return;
    }
    if (loading) {
      setError("Loading...");
      return;
    }
    try{
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (error) {
      console.error("Error searching movies:", error);
      setError("Error searching movies. Please try again later.");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>

      {error && <div className="error-message">{error}</div> }
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
