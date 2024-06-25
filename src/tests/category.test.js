require('../models')
const request = require('supertest')
const app = require('../app')

let categoryId
const BASE_URL = '/api/v1/categories'

const category = {
  name: ""
}

test("POST -> 'BASE_URL', should return statusCode 201, and res.body.name === category.name", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(category)

    categoryId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(category.name)
})


test("GET -> 'BASE_URL' should return res status code 200 , res.body[0].name === category.name and res.body.length = 1", async () => {

  const res = await request(app)
    .get(BASE_URL)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].name).toBe(category.name)
})

test("GET -> 'BASE_URL/:id', should return status code 200, return res.body.name === category.name ", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${categoryId}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(category.name)
}) 
/*
test("PUT -> 'BASE_URL/:id', should return status code 200, and res.body.name === categoryUpdate.name, ", async () => {

  const categoryUpdate = {
    name: "electronics"
  }

  const res = await request(app)
    .put(`${BASE_URL}/${categoryId}`)
    .send(categoryUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(categoryUpdate.name)
}) 
*/

test("DELETE -> 'BASE_URL/:id', should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${categoryId}`)

  expect(res.status).toBe(204)
}) 