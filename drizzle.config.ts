import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { dbFileName } from './src/db/dbFileName';

export default defineConfig({
	out: './drizzle',
	schema: './src/db/schema.ts',
	dialect: 'sqlite',
	dbCredentials: {
		url: dbFileName(),
	},
});
