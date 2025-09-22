// src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const API_KEY = '40395510edcd99a28d89af43cb5e07b8';
  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
  const searchMoviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(popularMoviesUrl);
        setMovies(response.data.results);
      } catch (err) {
        console.error("Erreur lors de la récupération des films :", err);
      }
    };
    fetchMovies();
  }, [popularMoviesUrl]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const response = await axios.get(`${searchMoviesUrl}${searchQuery}`);
        setMovies(response.data.results);
      } catch (err) {
        console.error("Erreur lors de la recherche des films :", err);
      }
    } else {
      // Si la barre de recherche est vide, on recharge les films populaires
      const response = await axios.get(popularMoviesUrl);
      setMovies(response.data.results);
    }
  };

  return (
    <div>
      <Header />
      <div className="search-bar-container">
        <form onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Rechercher un film..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Rechercher</button>
        </form>
      </div>
      <div className="movie-list-container">
        <h2>Films</h2>
        <div className="movie-grid">
          {movies.length > 0 ? (
            movies.map(movie => (
              <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                </div>
              </Link>
            ))
          ) : (
            <p>Aucun film trouvé.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;