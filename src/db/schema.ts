import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const tasksTable = sqliteTable('tasks_table', {
	id: int().primaryKey({ autoIncrement: true }),
	title: text().notNull(),
	creationDate: int({ mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	completionDate: int({ mode: 'timestamp' }),
});

export type Task = typeof tasksTable.$inferSelect;
