import { db } from './db';
import { tasksTable } from './schema';

export async function seed() {
	await db.delete(tasksTable);
	await db.insert(tasksTable).values({
		title: 'world domination',
	});
	const tasks = await db.select().from(tasksTable);
	console.log({ tasks });
}

seed();
