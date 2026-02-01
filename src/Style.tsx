import './styles/Style.css';

import classNames from 'classnames';
import type { MouseEvent } from 'react';

export interface StyleProps {
	readonly title: string;
	readonly isSelected: boolean;
	readonly onStyleClick: (ev: MouseEvent) => void;
}

export default function Style({ title, isSelected, onStyleClick }: StyleProps) {
	return (
		<a
			className={ classNames('style', 'button', { isSelected }) }
			data-testid={ `style-${title.toLowerCase()}` }
			role="style"
			onClick={ onStyleClick }
		>
			{ title }
		</a>
	);
}
