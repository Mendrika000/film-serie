// src/components/Header.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  return (
    <header className="header-home">
      <h1>Voir vos film et serie préférer</h1>
      <nav>
        <Link to="/movies" className="nav-link">Films</Link>
        <Link to="/series" className="nav-link">Séries</Link>
        <button onClick={handleLogout}>Déconnexion</button>
      </nav>
    </header>
  );
};

export default Header;