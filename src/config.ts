import { config } from "dotenv"
config()

export const PORT = process.env.PORT
export const MONGODB_CONN_STRING = process.env.MONGODB_CONN_STRING
export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN