// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MoviePage from './pages/MoviePage';
import SeriesPage from './pages/SeriePage'; // Import du nouveau composant
import SeriesDetailPage from './pages/SeriesDetailPage'; // Import du nouveau composant
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<HomePage />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/series/:id" element={<SeriesDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;