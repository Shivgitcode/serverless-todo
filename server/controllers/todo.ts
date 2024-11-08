import { drizzle } from "drizzle-orm/vercel-postgres";
import { Context } from "hono";
import postgres from "postgres";
import { todos } from "../drizzle/schema";
import { getCookie } from "hono/cookie";
import { decode } from "hono/jwt";
import { eq } from "drizzle-orm";
import { sql } from "@vercel/postgres"

export const createTodo = async (c: Context) => {
    const db = drizzle({ client: sql })
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
    const db = drizzle({ client: sql })
    const token = getCookie(c, "jwt");
    const { header, payload } = decode(token as string)
    const getAllTodos = await db.select().from(todos).where(eq(todos.userId, payload.id as string))
    return c.json({
        message: "todo created",
        data: getAllTodos
    })


}

export const deleteTodo = async (c: Context) => {
    const db = drizzle({ client: sql })
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
    const db = drizzle({ client: sql })
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