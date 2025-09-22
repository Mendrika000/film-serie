// src/pages/SeriesPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const SeriesPage = () => {
  const [series, setSeries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const API_KEY = '40395510edcd99a28d89af43cb5e07b8';
  const popularSeriesUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`;
  const searchSeriesUrl = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=`;

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get(popularSeriesUrl);
        setSeries(response.data.results);
      } catch (err) {
        console.error("Erreur lors de la récupération des séries :", err);
      }
    };
    fetchSeries();
  }, [popularSeriesUrl]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const response = await axios.get(`${searchSeriesUrl}${searchQuery}`);
        setSeries(response.data.results);
      } catch (err) {
        console.error("Erreur lors de la recherche des séries :", err);
      }
    } else {
      const response = await axios.get(popularSeriesUrl);
      setSeries(response.data.results);
    }
  };

  return (
    <div>
      <Header />
      <div className="search-bar-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Rechercher une série..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Rechercher</button>
        </form>
      </div>
      <div className="movie-list-container">
        <h2>Séries populaires</h2>
        <div className="movie-grid">
          {series.length > 0 ? (
            series.map(show => (
              <Link to={`/series/${show.id}`} key={show.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                />
                <div className="movie-info">
                  <h3>{show.name}</h3>
                </div>
              </Link>
            ))
          ) : (
            <p>Aucune série trouvée.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeriesPage;