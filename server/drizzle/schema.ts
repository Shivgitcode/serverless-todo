import { pgTable, uuid, text } from "drizzle-orm/pg-core"
export const user = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    username: text("username"),
    password: text("password")
})