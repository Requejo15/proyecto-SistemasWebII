const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Movie = require('./models/Movie'); // Asegúrate de que esta ruta es correcta
const TVShow = require('./models/TVShow'); // Asegúrate de que esta ruta es correcta

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/sw2')
.then(() => {
    console.log('MongoDB connected');
    loadData();  // Ensure loadData is called here
})
.catch(err => console.log('MongoDB connection error:', err));


// Función para cargar los datos
const loadData = async () => {
    try {
        // Leer el archivo JSON
        const data = fs.readFileSync(path.join(__dirname, 'netflix_titles.json'), 'utf8');
        const titles = JSON.parse(data);

        // Insertar datos en la base de datos
        for (let title of titles) {
            if (title.type === "Movie") {
                await new Movie(title).save();
            } else if (title.type === "TV Show") {
                await new TVShow(title).save();
            }
        }

        console.log('Data loaded successfully!');
        mongoose.disconnect();  // Desconectar de MongoDB al finalizar la carga
    } catch (error) {
        console.error('Failed to load data', error);
        mongoose.disconnect();
    }
};
