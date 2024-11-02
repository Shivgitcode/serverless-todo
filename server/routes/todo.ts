import { Hono } from "hono";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todo";

export const todo = new Hono<{ Bindings: { DB_URL: string, SECRET: string } }>()

todo.post("/todo", createTodo)
todo.get("/todo", getAllTodos)
todo.delete("/todo/:id", deleteTodo)
todo.put("/todo/:id", updateTodo)