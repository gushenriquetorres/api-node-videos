import 'dotenv/config'
import { fastify } from 'fastify'
import { DatabasePostgres } from './db/database-postgres.js'

const server = fastify()

const databasePostgres = new DatabasePostgres()

server.get('/videos', async (request) => {
  const search = request.query.search
  const videos = await databasePostgres.list(search)
  return videos
})

server.post('/videos', async (request, reply) => {
  const { title, description, duration } = request.body

  await databasePostgres.create({
    title,
    description,
    duration,
  })

  reply.status(201).send()
})

server.put('/videos/:id', async (request, reply) => {
  const videoID = request.params.id
  const { title, description, duration } = request.body

  await databasePostgres.update(videoID, {
    title,
    description,
    duration,
  })

  return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
  const videoID = request.params.id
  await databasePostgres.delete(videoID)

  return reply.status(204).send()
})

server.listen({ port: process.env.PORT ?? 3333 }, () => console.log('Server running at http://localhost:3333'))
