import React, { useState } from 'react';
import './MovieSearchApp.css';

const MovieSearchApp = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const API_KEY = 'aab8afe2'; // Replace with your actual API key

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    fetchMovies();
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
    }
  };

  return (
    <div className="movie-search-app">
      <h1>Movie Search App</h1>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter a movie title"
          className="query-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
              <div className="movie-details">
                <h2>{movie.Title}</h2>
                <p>{movie.Year}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default MovieSearchApp;
