import { Hono } from 'hono'

const app = new Hono()

app.all("*", async (c) => {
  return c.text("Hello World!")
})

export default app
