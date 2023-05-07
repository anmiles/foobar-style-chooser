import ko from 'knockout';
import { Style } from './style';

export { Section };

class Section {
	title: string;
	styles: Style[];
	toString: ko.Computed<string>;

	constructor(title: string, styles: string[]) {
		this.title  = title;
		this.styles = styles.map((style) => new Style(style));
	}
}
