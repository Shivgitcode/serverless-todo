import { drizzle } from "drizzle-orm/postgres-js";
import { Context } from "hono";
import postgres from "postgres"
import { user } from "../drizzle/schema";
import bcrypt from "bcryptjs"
import { eq, jaccardDistance } from "drizzle-orm";
import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";

export const createUser = async (c: Context) => {
    const client = postgres(c.env.DB_URL, { max: 1 })
    const db = drizzle(client, { logger: true })
    const body = await c.req.json()
    const hashPass = await bcrypt.hash(body.password, 12)
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

export const loginUser = async (c: Context) => {
    const client = postgres(c.env.DB_URL, { max: 1 })
    const db = drizzle(client, { logger: true })
    const body = await c.req.json();
    const findUser = await db.select().from(user).where(eq(user.username, body.username))
    if (!findUser[0]) {
        return c.json({
            message: "user not found"
        })

    }
    console.log(findUser[0])
    const verify = await bcrypt.compare(body.password, findUser[0].password as string);
    console.log(verify)
    if (verify) {
        const token = await sign(findUser[0], c.env.SECRET);
        setCookie(c, "jwt", token);
        return c.json({
            message: "logged in succcessfully",
            data: token

        })

    }
    else {
        return c.json({
            message: "not logged in successfully",
        })
    }


}