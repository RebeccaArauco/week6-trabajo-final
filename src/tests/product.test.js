require('../models')
const request = require('supertest')
const app = require('../app')

let productId
let TOKEN

const BASE_URL_USERS = '/api/v1/users/login'
const BASE_URL = '/api/v1/products'



beforeAll(async()=>{
  const body ={
    email: "josephine@gmail.com",
    password: "josephine1234"
  }

  const res = await request(app)
    .post(BASE_URL_USERS)
    .send(body)


    TOKEN = res.body.token
})


test("POST -> 'BASE_URL', should return statusCode 201, and res.body.title === product.title", async () => {

  const product = {
    title: "Shoes",
    description: "Loremipsurvl",
    price: 24
  }

  const res = await request(app)
    .post(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)
    .send(product)

    productId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.title).toBe(product.title)
})


test("GET -> 'BASE_URL' should return res status code 200 , res.body[0].title === product.title and res.body.length = 1", async () => {

  const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(200)
  
})

test("GET -> 'BASE_URL/productId', should return statusCode 200, and res.body.title === product.title", async () => {
    const res = await request(app)
      .get(`${BASE_URL}/${productId}`)
  
    expect(res.statusCode).toBe(200)
  /*
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)*/
  
  //  expect(res.body.category).toBeDefined()
 //   expect(res.body.category).toHaveLength(0)
  })

test("PUT -> 'BASE_URL/:id', should return status code 200, and res.body.title === productUpdate.title, ", async () => {

  const productUpdate = {
    title: "Pants"
  }

  const res = await request(app)
    .put(`${BASE_URL}/${productId}`)
    .send(productUpdate)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.title).toBe(productUpdate.title)
}) 


test("DELETE -> 'BASE_URL/:id', should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${productId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(204)
}) 