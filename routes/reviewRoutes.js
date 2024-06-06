
const express = require('express');
const router = express.Router();
const Review = require('../models/Reviews');

// Añadir una reseña
router.post('/', async (req, res) => {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: 'Error adding review', error: err });
    }
});

module.exports = router;
