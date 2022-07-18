import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const client = new Client({
  host: process.env.HOST,
  port: Number(process.env.PORT),
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
});
