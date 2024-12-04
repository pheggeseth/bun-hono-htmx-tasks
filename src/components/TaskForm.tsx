export function TaskForm({ taskListId }: { taskListId: string }) {
	return (
		<form
			hx-post="/api/tasks"
			hx-target={`#${taskListId}`}
			hx-swap="beforeend"
			hx-on-htmx-after-request="this.reset()"
		>
			<input
				aria-label="new task title"
				name="title"
				required
				placeholder="What needs to be done?"
			/>
			<button type="submit">Create task</button>
		</form>
	);
}
