import type { PropsWithChildren } from 'hono/jsx';

export function Layout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<script src="https://cdn.tailwindcss.com" />
				<script src="https://unpkg.com/htmx.org@2.0.3" />
			</head>
			<body>{children}</body>
		</html>
	);
}
