import { sleep } from 'bun';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { Layout } from './Layout';
import { TaskForm } from './TaskForm';
import { db } from './db';
import { tasksTable } from './db/schema';

const app = new Hono();

app.get('/', (c) => {
	return c.html(
		<Layout>
			<TaskForm />
			<ul id="task-list" hx-get="/api/tasks" hx-trigger="load">
				<div class="htmx-indicator">loading...</div>
			</ul>
		</Layout>,
	);
});

type Task = typeof tasksTable.$inferSelect;

function TaskListItem({ task }: { task: Task }) {
	const id = `task-${task.id}`;
	return (
		<li id={id}>
			<div>
				<div>{task.title}</div>
				<button
					type="button"
					hx-delete={`/api/task/${task.id}`}
					hx-target="closest li"
					hx-swap="delete"
					hx-on="htmx:afterRequest: console.log('Element deleted')"
				>
					Delete
				</button>
			</div>
		</li>
	);
}

app.get('/api/tasks', async (c) => {
	await sleep(250);
	const tasks = await db.select().from(tasksTable);
	return c.html(
		<>
			{tasks.map((task) => (
				<TaskListItem key={task.id} task={task} />
			))}
		</>,
	);
});

app.post('/api/task', async (c) => {
	await sleep(250);
	const { title } = await c.req.parseBody();

	if (typeof title !== 'string') {
		return c.body('title is required', 400);
	}

	const newTasks = await db.insert(tasksTable).values({ title }).returning();

	return c.html(<TaskListItem task={newTasks[0]} />);
});

app.delete('/api/task/:taskId', async (c) => {
	await sleep(250);
	const taskId = c.req.param('taskId');

	await db.delete(tasksTable).where(eq(tasksTable.id, Number(taskId)));

	return c.body(null, 200);
});

export default app;
