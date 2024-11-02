import { Hono } from 'hono'
import { user } from '../routes/user'
import { todo } from '../routes/todo'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.route("/api/v1", user)
app.route("/api/v1", todo)
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app