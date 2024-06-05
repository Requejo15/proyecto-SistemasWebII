
const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    show_id: String,
    type: String,
    title: String,
    director: String,
    cast: String,
    country: String,
    date_added: String,
    release_year: Number,
    rating: String,
    duration: String,
    listed_in: String,
    description: String
}, { collection: 'movies' }); 

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
