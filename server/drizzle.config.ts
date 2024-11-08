import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"
config({ path: ".dev.vars" })

export default defineConfig({
    dialect: "postgresql",
    schema: "drizzle/schema.ts",
    out: "drizzle/migrations",
    dbCredentials: {
        url: process.env.POSTGRES_URL as string
    },
    verbose: true,
    strict: true

})
