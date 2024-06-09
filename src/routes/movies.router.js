const { getAll, create, getOne, remove, update, setActors, setDirectors, setGenres } = require('../controllers/movie.controllers');
const express = require('express');

const routerMovie = express.Router();

//?  rutas estaticas
routerMovie.route('/')
    .get(getAll)
    .post(create);

//? seteo de actores
routerMovie.route('/:id/actors')
    .post(setActors)

//? seteo de directores
routerMovie.route('/:id/directors')
    .post(setDirectors)

//? seteo de generos
routerMovie.route('/:id/genres')
    .post(setGenres)

//? rutas dinamicas
routerMovie.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerMovie;