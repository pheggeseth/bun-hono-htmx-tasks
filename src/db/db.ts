import 'dotenv/config';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { getDBFileName } from './getDBFileName';

export const db = drizzle(getDBFileName());
