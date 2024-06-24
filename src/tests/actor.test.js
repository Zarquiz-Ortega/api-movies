const request = require('supertest')
const app = require('../app.js')

const actor = {
    firstName: 'John',
    lastName: 'Doe',
    nationality: 'American',
    image: 'http://example.com/image.jpg',
    birthday: '1990-01-01'
}

const BASE_URL = '/api/v1/actors'
let actorId

//? CREATE 
test("POST -> 'BASE_URL', should return status code 201 and res.body.firstName === actor.firstName", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(actor)
    actorId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});

//? GET ALL
test("GET -> 'BASE_URL' should return status code 200, res.body[0].firstName === actor.firstName and res.body.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].firstName).toBe(actor.firstName)
});

//? GET ONE 
test("GET -> 'BASE_URL/:id' should return status code 200 and res.body.firstName === actor.firstNane", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${actorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});

//? UPDATE
test("PUT -> 'BASE_URL/:id' should return status code 200 and res.body.firstName === actorUpdate.firstName", async() => {
    const actorUpdate = {
        firstName: 'Adan',
        lastName: 'Salder',
        nationality: 'American',
        image: 'http://example.com/image.jpg',
        birthday: '1990-01-01'
    }

    const res = await request(app)
        .put(`${BASE_URL}/${actorId}`)
        .send(actorUpdate)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)
});

//? DELETE
test("DELETE -> 'BASE_URL/:id', should return status code 204", async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${actorId}`)

    expect(res.statusCode).toBe(204)
});