// services/tmdbService.js
const axios = require('axios');
const { tmdbApiKey } = require('../config/apiKeys');
const baseUrl = 'https://api.themoviedb.org/3';

const getMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(`${baseUrl}/movie/${movieId}?api_key=${tmdbApiKey}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
};

module.exports = {
    getMovieDetails
};
