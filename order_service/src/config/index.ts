import dotenv from "dotenv";

dotenv.config();

export const DB_URL = process.env.DATABASE_URL;
export const PORT = process.env.APP_PORT;