import { createContext, useState, useContext ,useEffect} from "react";

const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};  

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites(prev=> [...prev, movie]);
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((fav) => fav.id !== movie.id));
  };

  const isFavorite = (movie) => {
    return favorites.some((fav) => fav.id === movie.id);
  };

  const value = {
    movies,
    loading,
    error,
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  }

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  )
};
