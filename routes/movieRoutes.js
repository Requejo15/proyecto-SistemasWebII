const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const { getMovieDetails } = require("../services/tmdbService");
const { convertJsonToXml } = require("../utils/xmlConverter");

const DEFAULT_PAGE_SIZE = 10;

router.get("/", async (req, res) => {
  try {
    let movies;
    let page = 1;
    let pageSize = DEFAULT_PAGE_SIZE;

    if (req.query.page) {
      page = parseInt(req.query.page); // Página solicitada
    }
    if (req.query.pageSize) {
      pageSize = parseInt(req.query.pageSize); // Tamaño de página
    }

    const skip = (page - 1) * pageSize; // Número de documentos para omitir

    if (!req.query.page && !req.query.pageSize) {
      // Si no se especifica ninguna paginación, devolver todos los registros
      movies = await Movie.find();
    } else {
      // Si se especifica paginación, aplicarla
      movies = await Movie.find().skip(skip).limit(pageSize);
    }

    res.json(movies);
  } catch (err) {
    res.status(500).send({ message: "Error fetching movies", error: err });
  }
});

router.get("/:show_id", async (req, res) => {
  try {
    const movie = await Movie.findOne({ show_id: req.params.show_id });
    if (!movie) {
      return res.status(404).send({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).send({ message: "Error fetching movie", error: err });
  }
});

router.get("/tmdb/:title", async (req, res) => {
  const movieName = req.params.title;
  const format = req.query.format;
  try {
    const movieDetails = await getMovieDetails(movieName);

    if (format && format.toLowerCase() === "xml") {
      const xmlData = convertJsonToXml(movieDetails);
      res.type("application/xml");
      res.send(xmlData);
    } else {
      // Respuesta JSON por defecto
      res.json(movieDetails);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener películas por género
router.get("/genres/:genre", async (req, res) => {
  try {
    const genre = req.params.genre;
    const regex = new RegExp(genre, "i"); // 'i' hace que la búsqueda sea insensible a mayúsculas/minúsculas
    const movies = await Movie.find({ listed_in: { $regex: regex } });
    if (movies.length === 0) {
      return res.status(404).send({ message: "No movies found for the specified genre" });
    }
    res.json(movies);
  } catch (err) {
    res.status(500).send({ message: "Error fetching movies by genre", error: err });
  }
});

// Obtener películas por año de lanzamiento
router.get("/year/:year", async (req, res) => {
  try {
    const movies = await Movie.find({ release_year: req.params.year });
    if (movies.length === 0) {
      return res.status(404).send({ message: "No movies found for the specified year" });
    }
    res.json(movies);
  } catch (err) {
    res.status(500).send({ message: "Error fetching movies by year", error: err });
  }
});
router.post("/", async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: "Error adding movie", error: err });
  }
});

// Actualizar una película
router.put("/:show_id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findOneAndUpdate({ show_id: req.params.show_id }, req.body, { new: true });
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: "Error updating movie", error: err });
  }
});

// Eliminar una película
router.delete("/:show_id", async (req, res) => {
  try {
    const deletedMovie = await Movie.findOneAndDelete({ show_id: req.params.show_id });
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ message: "Movie successfully deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting movie", error: err });
  }
});

module.exports = router;
