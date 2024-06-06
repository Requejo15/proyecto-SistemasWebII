const express = require("express");
const router = express.Router();
const Review = require("../models/Reviews");

// Añadir una reseña
router.post("/", async (req, res) => {
  try {
    const { show_id, text, user_id, rating } = req.body;

    // Verificar si se proporcionó show_id
    if (!show_id) {
      return res.status(400).json({ message: "Show ID is required" });
    }

    // Verificar si se proporcionó user_id
    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newReviewData = {
      user_id: user_id,
      show_id: show_id,
      text: text,
      rating: rating,
    };

    const newReview = new Review(newReviewData);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: "Error adding review", error: err });
  }
});

// Obtener reseñas por show_id
router.get("/:show_id", async (req, res) => {
  try {
    const { show_id } = req.params;

    // Buscar las reseñas con el show_id especificado
    const reviews = await Review.find({ show_id: show_id });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for the specified show ID" });
    }

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving reviews", error: err });
  }
});

module.exports = router;
