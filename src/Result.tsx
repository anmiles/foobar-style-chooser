import './styles/Result.css';

interface TextBoxProps {
	readonly selectedStyles: string[];
	readonly setSelectedStyles: (selectedStyles: string[]) => void;
}

export default function Result({ selectedStyles, setSelectedStyles }: TextBoxProps) {
	const value = [ '', ...selectedStyles.sort(), '' ].join(':');

	async function copy() {
		await navigator.clipboard.writeText(value);
	}

	async function paste() {
		const nextValue = await navigator.clipboard.readText();
		setSelectedStyles(nextValue.split(':').filter((style) => style));
	}

	return (
		<div
			className="result"
			data-testid="result"
		>
			<a data-testid="value">{ value }</a>

			<input
				type="button"
				className="button"
				data-testid="copy"
				value="Copy"
				onClick={ copy }
			/>

			<input
				type="button"
				className="button"
				data-testid="paste"
				value="Paste"
				onClick={ paste }
			/>
		</div>
	);
}
