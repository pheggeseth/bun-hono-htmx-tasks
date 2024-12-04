import 'dotenv/config';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { dbFileName } from './dbFileName';

export const db = drizzle(dbFileName());
