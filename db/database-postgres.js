import { randomUUID } from 'node:crypto'
import { sql } from './db.js'

export class DatabasePostgres {
  #videos = new Map()

  async list(search) {
    let videos

    if (search) {
      return (videos = await sql`SELECT * FROM videos WHERE title ILIKE '%' || ${search} || '%'`)
    } else {
      return (videos = await sql`SELECT * FROM videos`)
    }
  }

  async create(video) {
    const videoID = randomUUID()
    const { title, description, duration } = video

    await sql`INSERT INTO videos (id, title, description, duration) VALUES (${videoID}, ${title}, ${description}, ${duration})`
  }

  async update(id, video) {
    const { title, description, duration } = video

    await sql`UPDATE videos SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
  }

  async delete(id) {
    await sql`DELETE from videos WHERE id = ${id}`
  }
}
