import type { Task } from '../db/schema';

export function TaskListItem({ task }: { task: Task }) {
	const id = `task-${task.id}`;

	return (
		<li id={id} class="border rounded py-1 px-2 mt-2 first:mt-0">
			<div class="flex justify-between">
				<div>{task.title}</div>
				<button
					class="text-sm"
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
