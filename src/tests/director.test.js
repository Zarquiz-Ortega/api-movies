const request = require('supertest')
const app = require('../app.js')

const director = {
    firstName: 'Joe',
    lastName: 'Russo',
    nationality: 'American',
    image: 'http://example.com/image.jpg',
    birthday: '1990-01-01'
}

const BASE_URL = '/api/v1/directors'
let directorId

//? CREATE
test("POST -> 'BASE_URL', should return status code 201 and res.body.firstName === director.firstName", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(director)

    directorId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
});

//? GET ALL
test("GET -> 'BASE_URL', should return status code 200, res.body.length === 1 and res.body[0].firstName === director.firstName", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].firstName).toBe(director.firstName)
});

//? GET ONE 
test("GET -> 'BASE_URL/:id', should return status code 200 and res.body.firstName === director.firstName", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${directorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
});

//? UPDATE
test("PUT ->  'BASE_URL/:id', should return status code 200 and res.body.firstName === directorUpdate.firstName", async () => {
    const directorUpdate = {
        firstName: 'Anthony',
        lastName: 'Russo',
        nationality: 'American',
        image: 'http://example.com/image.jpg',
        birthday: '1990-01-01'
    }

    const res = await request(app)
        .put(`${BASE_URL}/${directorId}`)
        .send(directorUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUpdate.firstName)
});


//? DELETE
test("DELETE -> 'BASE_URL/:id' should return status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${directorId}`)

    expect(res.statusCode).toBe(204)
});