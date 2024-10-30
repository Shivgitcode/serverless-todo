import { Hono } from "hono";
import { createUser } from "../controllers/user";

export const user = new Hono<{ Bindings: { DB_URL: string, SECRET: string } }>()

user.post("/signup", createUser)

