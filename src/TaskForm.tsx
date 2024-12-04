export function TaskForm() {
	return (
		<form
			hx-post="/api/task"
			hx-target="#task-list"
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
