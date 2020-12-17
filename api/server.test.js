const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('../api/server');

const Livy = { username: 'livy', password: '1234' }
const Emma = { username: 'emma', password: '1234' }
const Drew = { username: 'drew' }

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('users').truncate()
})
afterAll(async () => {
  await db.destroy()
})

describe('endpoints', () => {
  describe('[POST] /api/auth/register', () => {
    it('should respond with a 201 status with successful registration', async () => {
      const res = await request(server).post('/api/auth/register').send(Livy)
      expect(res.status).toEqual(201)
      expect(res.body.username).toBe('livy')
    })
    it('should respond with 400 error if username or password are missing', async () => {
      const res = await request(server).post('/api/auth/register').send(Drew)
      expect(res.status).toEqual(400)
      expect(JSON.stringify(res.body)).toMatch('username and password required')
    })
    it('should respond with a 400 error if username is not unique', async () => {
      let res = await request(server).post('/api/auth/register').send(Emma)
      res = await request(server).post('/api/auth/register').send(Emma)
      expect(res.status).toEqual(400)
      expect(JSON.stringify(res.body)).toMatch('username taken')
    })
  })
  describe('[POST] /api/auth/login', () => {
    it('should respond with a 200 status with successful login', async () => {
      await request(server).post('/api/auth/register').send(Livy)
      const res = await request(server).post('/api/auth/login').send(Livy)
      expect(res.status).toEqual(200)
    })
    it('should respond with 400 error if username or password are missing', async () => {
      await request(server).post('/api/auth/register').send(Drew)
      const res = await request(server).post('/api/auth/login').send(Drew)
      expect(res.status).toEqual(400)
      expect(JSON.stringify(res.body)).toMatch('username and password required')
    })
    it('should respond with a 400 status if the username does not exist', async () => {
      const res = await request(server).post('/api/auth/login').send(Emma)
      expect(res.status).toEqual(400)
      expect(JSON.stringify(res.body)).toMatch('invalid credentials')
    })
  })
  describe('[GET /api/jokes', () => {
    it('', async () => {

    })
    it('', async () => {

    })
  })
})
