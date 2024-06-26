require('../models')
const request = require('supertest')
const app = require('../app')

let userId
const BASE_URL = '/api/v1/users'

const user = {
  firstName: "Luna",
  lastName: "Smith",
  email: "luna@gmail.com",
  password: "luna1234",
  phone: "56512345987"
}

test("POST -> 'BASE_URL', should return statusCode 201, and res.body.firstName === user.firstName", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(user)

    userId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(user.firstName)
})


test("GET -> 'BASE_URL' should return res status code 200 , res.body[0].firstName === user.firstName and res.body.length = 2", async () => {

  const res = await request(app)
    .get(BASE_URL)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].firstName).toBe(user.firstName)
})

test("GET -> 'BASE_URL/:id', should return status code 200, return res.body.firstName === user.firstName ", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${userId}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(user.firstName)
}) 

test("PUT -> 'BASE_URL/:id', should return status code 200, and res.body.firstName === userUpdate.firstName, ", async () => {

  const userUpdate = {
    firstName: "Paola"
  }

  const res = await request(app)
    .put(`${BASE_URL}/${userId}`)
    .send(userUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(userUpdate.firstName)
}) 

test("DELETE -> 'BASE_URL/:id', should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${userId}`)

  expect(res.status).toBe(204)
}) 