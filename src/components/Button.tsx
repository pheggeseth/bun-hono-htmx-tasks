import type { JSX, PropsWithChildren } from 'hono/jsx';

export function Button(
	props: PropsWithChildren<JSX.IntrinsicElements['button']>,
) {
	return (
		<button
			{...props}
			class="rounded bg-gray px-2 py-0.5 text-sm bg-gray-200 hover:bg-gray-300 focus-visible:bg-gray-300 active:bg-gray-400"
		/>
	);
}
