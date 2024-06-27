const request = require('supertest')
const app = require('../app')

let userId
let TOKEN
const BASE_URL = '/api/v1/users'



beforeAll(async()=>{
  const body ={
    email: "josephine@gmail.com",
    password: "josephine1234"
  }

  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(body)
   // console.log(res.body.token);

    TOKEN = res.body.token
})


test("POST -> 'BASE_URL', should return statusCode 201, and res.body.firstName === user.firstName", async () => {

  const user = {
    firstName: "Luna",
    lastName: "Smith",
    email: "luna@gmail.com",
    password: "luna1234",
    phone: "56512345987"
  }

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
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(200)
  
})


test("PUT -> 'BASE_URL/:id', should return status code 200, and res.body.firstName === userUpdate.firstName, ", async () => {

  const userUpdate = {
    firstName: "Paola"
  }

  const res = await request(app)
    .put(`${BASE_URL}/${userId}`)
    .send(userUpdate)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(userUpdate.firstName)
}) 

test("POST -> 'BASE_URL/login', should return statusCode 401", async () => {

  const body = {
    email: "luna@gmail.com",
    password: "wrong password"
  }

  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(body)

  expect(res.statusCode).toBe(401)
})

test("POST -> 'BASE_URL/login', should return statusCode 200, res.body.user and res.body.token to be defined, and res.body.user.email === body.email", async () => {
  const body = {
    email: "luna@gmail.com",
    password: "luna1234"
  }

  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(body)



  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.user).toBeDefined()
  expect(res.body.token).toBeDefined()
  expect(res.body.user.email).toBe(body.email)
})

test("DELETE -> 'BASE_URL/:id', should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${userId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(204)
}) 