// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Requête POST vers votre API de login
      const res = await axios.post('/api/users/login', formData);
      
      // Si la connexion réussit, stockez le token
      localStorage.setItem('token', res.data.token);
      
      console.log('Connexion réussie ! Token :', res.data.token);
      // Redirigez l'utilisateur vers la page d'accueil ou de la liste des films
      // Exemple avec React Router: history.push('/movies');
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      <input
        type="email"
        placeholder="Adresse email"
        name="email"
        value={email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        name="password"
        value={password}
        onChange={handleChange}
        required
      />
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;