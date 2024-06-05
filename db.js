
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const NetflixTitle = require('./models/NetflixTitle'); 

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/proyecto', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Función para cargar los datos
const loadData = async () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'netflix_titles.json'), 'utf8');
        const titles = JSON.parse(data);
        await NetflixTitle.insertMany(titles); // Insertar los datos en la base de datos
        console.log('Data loaded successfully');
        mongoose.disconnect();
    } catch (error) {
        console.error('Failed to load data', error);
        mongoose.disconnect();
    }
};

loadData();
