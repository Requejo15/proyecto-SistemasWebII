const express = require('express');
const router = express.Router();
const TVShow = require('../models/TVShow'); 

// Obtener todos los programas de TV
router.get('/', async (req, res) => {
    try {
        const shows = await TVShow.find();
        res.json(shows);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching TV shows', error: err });
    }
});

// Obtener un programa de TV específico por show_id
router.get('/:show_id', async (req, res) => {
    try {
        const show = await TVShow.findOne({ show_id: req.params.show_id });
        if (!show) {
            return res.status(404).send({ message: 'TV show not found' });
        }
        res.json(show);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching TV show', error: err });
    }
});

// Obtener programas de TV por género
router.get('/genres/:genre', async (req, res) => {
    try {
        const shows = await TVShow.find({ listed_in: req.params.genre });
        if (shows.length === 0) {
            return res.status(404).send({ message: 'No TV shows found for the specified genre' });
        }
        res.json(shows);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching TV shows by genre', error: err });
    }
});

// Obtener programas de TV por año de lanzamiento
router.get('/year/:year', async (req, res) => {
    try {
        const shows = await TVShow.find({ release_year: req.params.year });
        if (shows.length === 0) {
            return res.status(404).send({ message: 'No TV shows found for the specified year' });
        }
        res.json(shows);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching TV shows by year', error: err });
    }
});
// Añadir un nuevo programa de TV
router.post('/', async (req, res) => {
    try {
        const newShow = new TVShow(req.body);
        await newShow.save();
        res.status(201).json(newShow);
    } catch (err) {
        res.status(400).json({ message: 'Error adding TV show', error: err });
    }
});

// Actualizar un programa de TV
router.put('/:show_id', async (req, res) => {
    try {
        const updatedShow = await TVShow.findByIdAndUpdate(req.params.show_id, req.body, { new: true });
        if (!updatedShow) {
            return res.status(404).json({ message: 'TV show not found' });
        }
        res.json(updatedShow);
    } catch (err) {
        res.status(400).json({ message: 'Error updating TV show', error: err });
    }
});

// Eliminar un programa de TV
router.delete('/:show_id', async (req, res) => {
    try {
        const deletedShow = await TVShow.findByIdAndDelete(req.params.show_id);
        if (!deletedShow) {
            return res.status(404).json({ message: 'TV show not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ message: 'Error deleting TV show', error: err });
    }
});


module.exports = router;
