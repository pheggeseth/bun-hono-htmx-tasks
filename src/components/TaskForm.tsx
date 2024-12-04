export function TaskForm({ taskListId }: { taskListId: string }) {
	return (
		<form
			class="flex gap-2"
			hx-post="/api/tasks"
			hx-target={`#${taskListId}`}
			hx-swap="beforeend"
			hx-on-htmx-after-request="this.reset()"
		>
			<input
				class="flex-grow border rounded p-1"
				aria-label="new task title"
				name="title"
				required
				placeholder="What needs to be done?"
			/>
			<button class="text-sm" type="submit">
				Add task
			</button>
		</form>
	);
}
