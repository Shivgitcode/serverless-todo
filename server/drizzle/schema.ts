import { pgTable, uuid, text, date, boolean, integer } from "drizzle-orm/pg-core"
export const user = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    username: text("username"),
    email: text("email"),
    password: text("password")
})
export const todos = pgTable("todo", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name"),
    createdAt: date("createdAt").defaultNow(),
    isDone: boolean("isDone").default(false),
    userId: uuid("userId").notNull().references(() => user.id)


})