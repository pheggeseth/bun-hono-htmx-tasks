export function TaskList({ id }: { id: string }) {
	return <ul id={id} hx-get="/api/tasks" hx-trigger="load" />;
}
