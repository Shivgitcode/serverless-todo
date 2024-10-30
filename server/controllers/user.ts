import { drizzle } from "drizzle-orm/postgres-js";
import { Context } from "hono";
import postgres from "postgres"
import { user } from "../drizzle/schema";
import { sign } from "hono/jwt";


export const createUser = async (c: Context) => {
    const client = postgres(c.env.DB_URL, { max: 1 })
    const db = drizzle(client, { logger: true })
    const body = await c.req.json()
    const hashPass = await sign(body.password, c.env.SECRET)
    const newUser = await db.insert(user).values({
        ...body, password: hashPass
    }).returning({
        username: user.username,
        password: user.password
    })

    return c.json({
        data: newUser
    })

}