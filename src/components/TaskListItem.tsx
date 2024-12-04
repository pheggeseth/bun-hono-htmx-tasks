import type { Task } from '../db/schema';

export function TaskListItem({ task }: { task: Task }) {
	const id = `task-${task.id}`;

	return (
		<li id={id}>
			<div>
				<div>{task.title}</div>
				<button
					type="button"
					hx-delete={`/api/tasks/${task.id}`}
					hx-target="closest li"
					hx-swap="delete"
				>
					Delete
				</button>
			</div>
		</li>
	);
}
