const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');

const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({include: [Actor,Director,Genre]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

//TODOS SETEO DE ACTORES
const setActors = catchError(async (req,res) => {
    const {id} = req.params
    //* localisammos la pelicula con el id
    const movies = await Movie.findByPk(id)
    //! seteamos los actores
    await movies.setActors(req.body)
    //? recuperamos los actores
    const actor = await movies.getActors()
    //* retornamos la vista
    return res.json(actor)
});

//TODOS SETEO DE DIRECTORES
const setDirectors = catchError(async (req,res) => {
    const {id} = req.params
    //* localisamos la pelicula con el id
    const movie = await Movie.findByPk(id)
    //! seteamos el director a la pelicula
    await movie.setDirectors(req.body)
    //? recuperamos los directores
    const director = await movie.getDirectors()
    //* retornamos la vista
    return res.json(director)
})

// TODOS SETEO DE GENEROS

const setGenres = catchError(async (req,res) => {
    const {id} = req.params
    //* localisamos la pelicula con el id 
    const movie = await Movie.findByPk(id)
    //! seteo de los generos a la pelicula
    await movie.setGenres(req.body)
    //? recuperamos los generos seteados
    const genre = await movie.getGenres()
    //* retornamos la vista
    return res.json(genre)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setActors,
    setDirectors,
    setGenres
}