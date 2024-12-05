import { desc, eq, isNotNull, isNull } from 'drizzle-orm';
import { Hono } from 'hono';
import { Button } from '../components/Button';
import { ButtonGroup } from '../components/ButtonGroup';
import { TaskListItem } from '../components/TaskListItem';
import { db } from '../db';
import { tasksTable } from '../db/schema';

export const tasks = new Hono()
	.get('/', async (c) => {
		const filter = c.req.query('filter');

		let tasks: (typeof tasksTable.$inferSelect)[] = [];

		if (filter === 'active') {
			tasks = await db
				.select()
				.from(tasksTable)
				.where(isNull(tasksTable.completionDate))
				.orderBy(desc(tasksTable.creationDate));
		} else if (filter === 'completed') {
			tasks = await db
				.select()
				.from(tasksTable)
				.where(isNotNull(tasksTable.completionDate))
				.orderBy(desc(tasksTable.creationDate));
		} else {
			tasks = await db
				.select()
				.from(tasksTable)
				.orderBy(desc(tasksTable.creationDate));
		}

		return c.html(
			<div id="wrapper">
				<div class="flex gap-1 mb-2">
					<div>Show:</div>
					<ButtonGroup>
						<Button
							selected={!filter}
							hx-get="/api/tasks"
							hx-target="#wrapper"
							hx-swap="outerHTML"
						>
							All
						</Button>
						<Button
							selected={filter === 'active'}
							hx-get="/api/tasks?filter=active"
							hx-target="#wrapper"
							hx-swap="outerHTML"
						>
							Active
						</Button>
						<Button
							selected={filter === 'completed'}
							hx-get="/api/tasks?filter=completed"
							hx-target="#wrapper"
							hx-swap="outerHTML"
						>
							Completed
						</Button>
					</ButtonGroup>
				</div>
				<ul>
					{tasks.map((task) => (
						<TaskListItem key={task.id} task={task} />
					))}
				</ul>
			</div>,
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
