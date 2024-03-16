import { Style } from './style';

class Section {
	title  : string;
	hidden : boolean;
	styles : Style[];

	constructor({ title, hidden, styles } : { title : string; hidden? : boolean; styles : string[] }) {
		this.title  = title;
		this.hidden = hidden ?? false;
		this.styles = styles.map((style) => new Style(style));
	}
}

type Sections = Array<{
	title  : string;
	hidden : boolean;
	styles : string[];
}>;

export { Section };
export type { Sections };
