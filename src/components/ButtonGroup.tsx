import {
	Children,
	type PropsWithChildren,
	cloneElement,
	isValidElement,
} from 'hono/jsx';

export function ButtonGroup({ children, ...props }: PropsWithChildren) {
	return (
		<div {...props} class="flex">
			{Array.isArray(children)
				? Children.map(children, (child, index) => {
						if (isValidElement(child)) {
							return cloneElement(
								child,
								{
									...child.props,
									class:
										index === 0
											? 'rounded-none rounded-l'
											: index === children.length - 1
												? 'rounded-none rounded-r'
												: 'rounded-none',
								},
								child.children,
							);
						}
					})
				: children}
		</div>
	);
}
