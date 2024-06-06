const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user_id: String,
  show_id: String,
  text: String,
  rating: Number,
});

module.exports = mongoose.model("Review", reviewSchema);
