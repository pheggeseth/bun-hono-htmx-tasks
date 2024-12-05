export function TaskList({ id }: { id: string }) {
	return <div id={id} hx-get="/api/tasks" hx-trigger="load" />;
}
