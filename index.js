const express = require('express');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movieRoutes');
const showRoutes = require('./routes/showRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Initialize express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sw2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON bodies
app.use(express.json());

// Route handlers
app.use('/api/movies', movieRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/reviews', reviewRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
