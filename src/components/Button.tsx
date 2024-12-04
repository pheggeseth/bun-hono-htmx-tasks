import type { JSX, PropsWithChildren } from 'hono/jsx';

export function Button(
	props: PropsWithChildren<JSX.IntrinsicElements['button']>,
) {
	return <button {...props} class="text-sm" />;
}
