import { Hono } from 'hono'
import { user } from '../routes/user'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.route("/api/v1", user)
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app