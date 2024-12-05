import type { JSX, PropsWithChildren } from 'hono/jsx';

export function Button({
	selected,
	...props
}: PropsWithChildren<JSX.IntrinsicElements['button']> & {
	selected?: boolean;
}) {
	return (
		<button
			{...props}
			{...(selected ? { 'aria-pressed': true } : {})}
			class={`rounded border border-transparent bg-gray px-2 py-0.5 text-sm bg-gray-200 hover:bg-gray-300 focus-visible:bg-gray-300 active:bg-gray-400 focus:z-10 ${selected ? 'bg-gray-300 border border-gray-700' : ''} ${props.class}`}
		/>
	);
}
