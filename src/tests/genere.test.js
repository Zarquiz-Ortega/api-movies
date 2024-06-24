const request = require('supertest')
const app = require('../app.js')

const genre = {
    name: 'Terror'
}

const BASE_URL = '/api/v1/genres'
let genreId

//? CREATE
test("POST -> 'BASE_URL', should return status code 201 and res.body.name === genre.name", async() => {
    const res = await request(app)
        .post(BASE_URL)
        .send(genre)
    
    genreId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
});

//? GET ALL
test("GET -> 'BASE_URL', should return status code 200, res.body.length === 1 and res.body[0].name === genre.name", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].name).toBe(genre.name)
});

//? GET ONE 
test("GET -> 'BASE_URL/:id', should return status code 200 and res.body .name === genre.name", async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${genreId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
});

//? UPDATE
test("PUT ->  'BASE_URL/:id', should return status code 200 and res.body.name === genreUpdate.name", async() => {
    const genreUpdate = {
        name: 'Suspenso'
    }

    const res = await request(app)
        .put(`${BASE_URL}/${genreId}`)
        .send(genreUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genreUpdate.name)
});

//? DELETE
test("DELETE -> 'BASE_URL/:id' should return status code 204", async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${genreId}`)
    
    expect(res.statusCode).toBe(204)
});