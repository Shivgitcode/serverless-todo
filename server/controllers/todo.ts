import { drizzle } from "drizzle-orm/postgres-js";
import { Context } from "hono";
import postgres from "postgres";
import { todos } from "../drizzle/schema";
import { getCookie } from "hono/cookie";
import { decode } from "hono/jwt";
import { eq } from "drizzle-orm";

export const createTodo = async (c: Context) => {
    const client = postgres(c.env.DB_URL, { max: 1 })
    const db = drizzle(client, { logger: true })
    const token = getCookie(c, "jwt");
    const { header, payload } = decode(token as string)
    const body = await c.req.json();
    console.log(payload)
    const createdTodo = await db.insert(todos).values({ ...body, userId: payload.id }).returning({
        todo: todos.name
    })

    return c.json({
        message: "todo created",
        data: createdTodo
    })



}

export const getAllTodos = async (c: Context) => {
    const client = postgres(c.env.DB_URL, { max: 1 })
    const db = drizzle(client, { logger: true })
    const token = getCookie(c, "jwt");
    const { header, payload } = decode(token as string)
    const getAllTodos = await db.select().from(todos).where(eq(todos.userId, payload.id as string))
    return c.json({
        message: "todo created",
        data: getAllTodos
    })


}

export const deleteTodo = async (c: Context) => {
    const client = postgres(c.env.DB_URL, { max: 1 })
    const db = drizzle(client, { logger: true })
    const { id } = c.req.param()
    const deleteTodo = await db.delete(todos).where(eq(todos.id, id)).returning({
        todo: todos.name
    })

    return c.json({
        message: "todo deleted",
        data: deleteTodo

    })

}

export const updateTodo = async (c: Context) => {
    const client = postgres(c.env.DB_URL, { max: 1 })
    const db = drizzle(client, { logger: true })
    const { id } = c.req.param();
    const body = await c.req.json()
    const updateTodo = await db.update(todos).set({ ...body }).where(eq(todos.id, id)).returning({
        todo: todos.name
    })
    return c.json({
        message: "data",
        data: updateTodo
    })


}