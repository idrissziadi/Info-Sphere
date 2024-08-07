// src/api/tmdb.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '1eb3a35c95478e9b2e0aa594421987d6'
  }
});

export default api;
