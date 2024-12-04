import type { Task } from '../db/schema';
import { Button } from './Button';

export function TaskListItem({ task }: { task: Task }) {
	const id = `task-${task.id}`;

	return (
		<li id={id} class="border rounded py-1 px-2 mt-2 first:mt-0">
			<div class="flex justify-between">
				<div>{task.title}</div>
				<Button
					type="button"
					hx-delete={`/api/tasks/${task.id}`}
					hx-target="closest li"
					hx-swap="delete"
				>
					Delete
				</Button>
			</div>
		</li>
	);
}
