import type { Task } from '../db/schema';
import { Button } from './Button';

export function TaskListItem({ task }: { task: Task }) {
	const id = `task-${task.id}`;

	return (
		<li id={id} class="border rounded py-2 px-3 mt-2 first:mt-0 bg-white">
			<div class="flex justify-between">
				<div class="flex items-center gap-2">
					<input
						type="checkbox"
						checked={!!task.completionDate}
						hx-post={`/api/tasks/${task.id}/${task.completionDate ? 'uncomplete' : 'complete'}`}
						hx-target="closest li"
						hx-swap="outerHTML"
					/>
					<div>{task.title}</div>
				</div>
				<Button
					type="button"
					hx-delete={`/api/tasks/${task.id}`}
					hx-target="closest li"
					hx-swap="delete"
				>
					Delete
				</Button>
			</div>
			<div class="flex mt-1">
				{task.completionDate && (
					<div class="text-xs italic">
						Completed on{' '}
						{task.completionDate.toLocaleDateString(...dateFormatOptions)}
					</div>
				)}
				<div class="text-xs italic ml-auto">
					Added on {task.creationDate.toLocaleDateString(...dateFormatOptions)}
				</div>
			</div>
		</li>
	);
}

const dateFormatOptions: Parameters<Date['toLocaleDateString']> = [
	undefined,
	{
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	},
];
