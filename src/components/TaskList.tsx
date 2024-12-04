export function TaskList({ id }: { id: string }) {
	return (
		<ul id={id} hx-get="/api/tasks" hx-trigger="load">
			<div class="htmx-indicator">loading tasks...</div>
		</ul>
	);
}
