import { config } from 'dotenv';
import path from 'path';
export { connectDB } from './db.js';
///////////////////////////////////////////////////
const __dirname = path.resolve();
config({path: `${__dirname}/config/.env`})
export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT;