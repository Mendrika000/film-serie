// src/pages/MoviePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MoviePage = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  const API_KEY = '40395510edcd99a28d89af43cb5e07b8';
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const baseImageUrl = `https://image.tmdb.org/t/p/w500`;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(movieDetailsUrl);
        setMovie(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des détails du film :", err);
      }
    };
    fetchMovie();
  }, [movieDetailsUrl]);

  if (!movie) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="movie-detail-container">
      <div className="movie-poster">
        <img src={`${baseImageUrl}${movie.poster_path}`} alt={movie.title} />
      </div>
      <div className="movie-info-details">
        <h2>{movie.title}</h2>
        <p><strong>Date de sortie :</strong> {movie.release_date}</p>
        <p><strong>Note :</strong> {movie.vote_average.toFixed(1)}/10</p>
        <h3>Synopsis</h3>
        <p>{movie.overview}</p>
        <button onClick={() => window.history.back()}>Retour</button>
      </div>
    </div>
  );
};

export default MoviePage;