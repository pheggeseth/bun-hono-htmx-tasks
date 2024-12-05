import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { TaskListItem } from '../components/TaskListItem';
import { db } from '../db';
import { tasksTable } from '../db/schema';

export const tasks = new Hono()
	.get('/', async (c) => {
		const tasks = await db.select().from(tasksTable);
		return c.html(
			<>
				{tasks.map((task) => (
					<TaskListItem key={task.id} task={task} />
				))}
			</>,
		);
	})
	.post('/', async (c) => {
		const { title } = await c.req.parseBody();

		if (typeof title !== 'string') {
			return c.body('title is required', 400);
		}

		const newTasks = await db.insert(tasksTable).values({ title }).returning();

		return c.html(<TaskListItem task={newTasks[0]} />);
	})
	.post('/:taskId/complete', async (c) => {
		const taskId = c.req.param('taskId');

		const updatedTasks = await db
			.update(tasksTable)
			.set({ completionDate: new Date() })
			.where(eq(tasksTable.id, Number(taskId)))
			.returning();

		return c.html(<TaskListItem task={updatedTasks[0]} />);
	})
	.post('/:taskId/uncomplete', async (c) => {
		const taskId = c.req.param('taskId');

		const updatedTasks = await db
			.update(tasksTable)
			.set({ completionDate: null })
			.where(eq(tasksTable.id, Number(taskId)))
			.returning();

		return c.html(<TaskListItem task={updatedTasks[0]} />);
	})
	.delete('/:taskId', async (c) => {
		const taskId = c.req.param('taskId');

		await db.delete(tasksTable).where(eq(tasksTable.id, Number(taskId)));

		return c.body(null, 200);
	});
