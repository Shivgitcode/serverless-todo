import { Hono } from "hono";
import { createUser, loginUser } from "../controllers/user";

export const user = new Hono<{ Bindings: { DB_URL: string, SECRET: string } }>()

user.post("/signup", createUser)
user.post("/login", loginUser)

