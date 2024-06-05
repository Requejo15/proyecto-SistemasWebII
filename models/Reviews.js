
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    show_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TVShow' },
    text: String
});

module.exports = mongoose.model('Review', reviewSchema);
