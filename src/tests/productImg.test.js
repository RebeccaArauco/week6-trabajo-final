const request = require('supertest')
const app = require('../app')
const path = require('path')

let TOKEN
let imageId

const BASE_URL_USERS = '/api/v1/users/login'
const BASE_URL = '/api/v1/product_images'

beforeAll(async () => {
    const user ={
      email: "josephine@gmail.com",
      password: "josephine1234"
    }
  
    const res = await request(app)
      .post(BASE_URL_USERS)
      .send(user)
  
  
      TOKEN = res.body.token
  })

  test("POST -> 'BASE_URL', async() should return status code 201, res.body.url, res.body.filename to be Defined", async () => {

    const localImage = path.join(__dirname, 'createData', 'SamsungTV.png')
    
    const res= await request(app)
        .post(BASE_URL)
        .set("Authorization", `Bearer ${TOKEN}`)
        .attach('image', localImage)

        imageId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.url).toBeDefined()
    expect(res.body.filename).toBeDefined()  
})

test("GET -> 'BASE_URL',should return status code 200 and res.body.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
   
})

test("DELETE -> 'BASE_URL', should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${imageId}`)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
})