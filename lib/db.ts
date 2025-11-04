import { neon } from "@neondatabase/serverless"

if (!process.env.NEON_DATABASE_URL) {
  throw new Error("NEON_DATABASE_URL environment variable is required")
}

const sql = neon(process.env.NEON_DATABASE_URL)

export async function query(text: string, params: any[] = []) {
  try {
    return await sql(text, params)
  } catch (error) {
    console.error("[v0] Database query error:", error)
    throw error
  }
}

export default sql
