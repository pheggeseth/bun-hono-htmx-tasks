export async function TaskList() {
	return <ul hx-get="/api/tasks" hx-trigger="load" />;
}
