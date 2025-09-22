// src/pages/SeriesDetailPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

const SeriesDetailPage = () => {
  const [show, setShow] = useState(null);
  const { id } = useParams();

  const API_KEY = '40395510edcd99a28d89af43cb5e07b8';
  const showDetailsUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`;
  const baseImageUrl = `https://image.tmdb.org/t/p/w500`;

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await axios.get(showDetailsUrl);
        setShow(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des détails de la série :", err);
      }
    };
    fetchShow();
  }, [showDetailsUrl]);

  if (!show) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div>
        <Header />
        <div className="movie-detail-container">
            <div className="movie-poster">
            <img src={`${baseImageUrl}${show.poster_path}`} alt={show.name} />
            </div>
            <div className="movie-info-details">
            <h2>{show.name}</h2>
            <p><strong>Date de la première diffusion :</strong> {show.first_air_date}</p>
            <p><strong>Note :</strong> {show.vote_average.toFixed(1)}/10</p>
            <h3>Synopsis</h3>
            <p>{show.overview}</p>
            <button onClick={() => window.history.back()}>Retour</button>
            </div>
        </div>
    </div>
  );
};

export default SeriesDetailPage;