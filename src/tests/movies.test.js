require('../models')
const request = require('supertest')
const app = require('../app.js')
const Actor = require('../models/Actor.js')
const Director = require('../models/Director.js')
const Genre = require('../models/Genre.js')

const movie = {
    name: 'Avengers: Endgame',
    image: 'http://example.com/image.jpg',
    synopsis: 'lorem...',
    releaseYear: 1990
}

const BASE_URL = '/api/v1/movies'
let movieId
let actor
let director
let genre

afterAll(async () => {
    //! DELETE actors
    await actor.destroy()
    //! DELETE director
    await director.destroy()
    //! DELETE genre
    await genre.destroy()
})

//? CREATE
test("POST -> 'BASE_URL', should return status code 201 and res.body.name === movie.name", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(movie)

    movieId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});

//? GET ALL
test("GET -> 'BASE_URL', should return status code 200, res.body.length = 1 and res.body[0].name === movie.name", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].name).toBe(movie.name)
});

//? GET ONE 
test("GET -> 'BASE_URL/:id', should return status code 200 and res.body.name === movie.name", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${movieId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});

//? UPDATE
test("PUT ->  'BASE_URL/:id', should return status code 200 and res.body.name === movieUpdate.name", async () => {
    const movieUpdate = {
        name: 'Oppenheimer',
        image: 'http://example.com/image.jpg',
        synopsis: 'lorem...',
        releaseYear: 1990
    }

    const res = await request(app)
        .put(`${BASE_URL}/${movieId}`)
        .send(movieUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUpdate.name)
});

//? SET ACTOR
test("POST -> 'BASE_URL/:id/actors', should return status code 200 and res.body.length = 1", async () => {

    actor = await Actor.create({
        firstName: 'John',
        lastName: 'Doe',
        nationality: 'American',
        image: 'http://example.com/image.jpg',
        birthday: '1990-01-01'
    })

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/actors`)
        .send([actor.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].movieActor.movieId).toBeDefined()
    expect(res.body[0].movieActor.movieId).toBe(movieId)

    expect(res.body[0].movieActor.actorId).toBeDefined()
    expect(res.body[0].movieActor.actorId).toBe(actor.id)
});

//? SET DIRECTOR
test("POST -> 'BASE_URL/:id/directors', should return status code 200 and res.body.length = 1", async () => {
    director = await Director.create({
        firstName: 'Joe',
        lastName: 'Russo',
        nationality: 'American',
        image: 'http://example.com/image.jpg',
        birthday: '1990-01-01'
    })

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/directors`)
        .send([director.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].movieDirector.movieId).toBeDefined()
    expect(res.body[0].movieDirector.movieId).toBe(movieId)
    
    expect(res.body[0].movieDirector.directorId).toBeDefined()
    expect(res.body[0].movieDirector.directorId).toBe(director.id)
});

//? SET GENRE
test("POST -> 'BASE_URL/:id/genres', should return status code 200 and res.body.length = 1",  async() => {
    genre = await Genre.create({
        name: 'Terror'
    })

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/genres`)
        .send([genre.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].movieGenre.movieId).toBeDefined()
    expect(res.body[0].movieGenre.movieId).toBe(movieId)

    expect(res.body[0].movieGenre.genreId).toBeDefined()
    expect(res.body[0].movieGenre.genreId).toBe(genre.id)
});

//? DELETE
test("DELETE -> 'BASE_URL/:id' should return status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${movieId}`)

    expect(res.statusCode).toBe(204)
});

