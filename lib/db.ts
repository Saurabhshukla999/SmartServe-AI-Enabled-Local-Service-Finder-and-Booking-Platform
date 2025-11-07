import { neon, neonConfig } from "@neondatabase/serverless"

if (!process.env.NEON_DATABASE_URL) {
  throw new Error("NEON_DATABASE_URL environment variable is required")
}

const sql = neon(process.env.NEON_DATABASE_URL)

export async function query(text: string, params: any[] = []) {
  try {
    if (params.length > 0) {
      const result = await sql(text, params)
      return result
    } else {
      const result = await sql(text)
      return result
    }
  } catch (error) {
    console.error("[v0] Database query error:", error)
    throw error
  }
}

export async function transaction<T>(
  callback: (txQuery: (text: string, params?: any[]) => Promise<any>) => Promise<T>
): Promise<T> {
  try {
    await sql`BEGIN`
    
    const txQuery = async (text: string, params: any[] = []) => {
      if (params.length > 0) {
        return await sql(text, params)
      } else {
        return await sql(text)
      }
    }
    
    const result = await callback(txQuery)
    await sql`COMMIT`
    return result
  } catch (error) {
    await sql`ROLLBACK`
    console.error("[v0] Transaction error:", error)
    throw error
  }
}

export default sql
