import { db } from './db';
import { tasksTable } from './schema';

export async function seed() {
	await db.insert(tasksTable).values({
		title: 'world domination',
	});
}

seed();
