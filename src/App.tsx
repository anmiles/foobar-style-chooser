import './styles/App.css';

import { useState } from 'react';

import sections from '../config/sections.json'; // eslint-disable-line n/no-unpublished-import

import Result from './Result';
import Section from './Section';

export default function App() {
	const [ selectedStyles, setSelectedStyles ] = useState<string[]>([]);

	function handleStyleClick(style: string) {
		const nextSelectedStyles = selectedStyles.includes(style)
			? selectedStyles.filter((s) => s !== style)
			: [ ...selectedStyles, style ];

		setSelectedStyles(nextSelectedStyles);
	}

	return (
		<div
			className="app"
			data-testid="app"
		>
			{ sections.map((sectionData) => (
				'isHidden' in sectionData && sectionData.isHidden
					? null
					: (
							<Section
								key={ sectionData.title }
								selectedStyles={ selectedStyles }
								handleStyleClick={ handleStyleClick }
								{ ...sectionData }
							/>
						)
			),
			) }

			<Result
				selectedStyles={ selectedStyles }
				setSelectedStyles={ setSelectedStyles }
			/>
		</div>
	);
}
