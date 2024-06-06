const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie'); 
const { getMovieDetails } = require('../services/tmdbService');
const { convertJsonToXml } = require('../utils/xmlConverter');

// Obtener todas las películas
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching movies', error: err });
    }
});

router.get('/movies/:id', async (req, res) => {
    const movieDetails = await getMovieDetails(req.params.id);
    if (req.query.format === 'xml') {
        res.type('application/xml');
        res.send(convertJsonToXml(movieDetails));
    } else {
        res.json(movieDetails);
    }
});


// Obtener películas por género
router.get('/genres/:genre', async (req, res) => {
    try {
        const movies = await Movie.find({ listed_in: req.params.genre });
        if (movies.length === 0) {
            return res.status(404).send({ message: 'No movies found for the specified genre' });
        }
        res.json(movies);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching movies by genre', error: err });
    }
});

// Obtener películas por año de lanzamiento
router.get('/year/:year', async (req, res) => {
    try {
        const movies = await Movie.find({ release_year: req.params.year });
        if (movies.length === 0) {
            return res.status(404).send({ message: 'No movies found for the specified year' });
        }
        res.json(movies);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching movies by year', error: err });
    }
});
router.post('/', async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: 'Error adding movie', error: err });
    }
});

// Actualizar una película
router.put('/:show_id', async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.show_id, req.body, { new: true });
        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({ message: 'Error updating movie', error: err });
    }
});

// Eliminar una película
router.delete('/:show_id', async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.show_id);
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ message: 'Error deleting movie', error: err });
    }
});


module.exports = router;
