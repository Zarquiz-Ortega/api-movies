const express = require('express');
const routerGenre = require('./genre.router');
const routerDirector = require('./director.router');
const routerActor = require('./actor.router');
const routerMovie = require('./movies.router');
const router = express.Router();

// colocar las rutas aquí
//? GENRES
router.use('/genres', routerGenre)
//? ACTORS
router.use('/actors', routerActor)
//? DIRECTORS
router.use('/directors', routerDirector)
//? MOVIES
router.use('/movies',routerMovie)

module.exports = router;