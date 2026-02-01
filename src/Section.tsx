import './styles/Section.css';

import classNames from 'classnames';

import Style from './Style';

export interface SectionProps {
	readonly title: string;
	readonly styles: string[];
	readonly selectedStyles: string[];
	readonly handleStyleClick: (style: string) => void;
}

export default function Section({ title, styles, selectedStyles, handleStyleClick }: SectionProps) {
	return (
		<div
			className={ classNames('section', title) }
			data-testid={ `section-${title.toLowerCase()}` }
			role="section"
		>
			{ styles.map((style) => (
				<Style
					key={ style }
					title={ style }
					isSelected={ selectedStyles.includes(style) }
					onStyleClick={ () => handleStyleClick(style) }
				/>
			),
			) }
		</div>
	);
}
