import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export interface JWTPayload {
  id: number
  email: string
  role: string
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, SECRET) as JWTPayload
  } catch {
    return null
  }
}

export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload
  } catch {
    return null
  }
}
