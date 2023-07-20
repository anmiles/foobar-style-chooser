import ko from 'knockout';
import type { Sections } from '../types';
import { Section } from './section';

export { Model };

class Model {
	sections: Section[];
	value: ko.PureComputed<string>;

	constructor() {
		const sectionsJSON = this.getSections();
		this.sections      = sectionsJSON.map(({ title, styles }) => new Section(title, styles));

		this.value = ko.pureComputed({
			read  : () => this.combine(),
			write : (value: string) => this.parse(value),
		});
	}

	private getSections(): Sections {
		return require('../../sections.json');
	}

	private combine(): string {
		return `:${this.sections
			.map(
				(section) => section.styles
					.filter((style) => style.enabled())
					.map((style) => style.title),
			)
			.flat()
			.sort()
			.join(':')}:`;
	}

	private parse(value: string): void {
		const styles = value.split(':').filter((v) => v);

		this.sections
			.forEach(
				(section) => section.styles
					.forEach((style) => style.enabled(styles.includes(style.title))),
			);
	}

	private input(_model: Model, event: { target: { value: string }}) {
		this.parse(event.target.value);
	}
}
