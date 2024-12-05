import { Button } from './Button';

export function TaskForm({ taskListId }: { taskListId: string }) {
	return (
		<form
			class="flex items-center gap-2"
			hx-post="/api/tasks"
			hx-target={`#${taskListId}`}
			hx-swap="beforeend"
			hx-on-htmx-after-request="this.reset()"
		>
			<input
				class="flex-grow border rounded px-1 py-0.5 text-sm"
				aria-label="new task title"
				name="title"
				required
				placeholder="What needs to be done?"
			/>
			<Button type="submit" variant="primary">
				Add task
			</Button>
		</form>
	);
}
