import { Hono } from 'hono';
import { api } from './api';
import { Layout } from './components/Layout';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

const app = new Hono();

app.route('/api', api);

app.get('*', (c) => {
	return c.html(
		<Layout>
			<TaskForm taskListId="task-list" />
			<TaskList id="task-list" />
		</Layout>,
	);
});

export default app;
