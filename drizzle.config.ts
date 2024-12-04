import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { getDBFileName } from './src/db/getDBFileName';

export default defineConfig({
	out: './drizzle',
	schema: './src/db/schema.ts',
	dialect: 'sqlite',
	dbCredentials: {
		url: getDBFileName(),
	},
});
