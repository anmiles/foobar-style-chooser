import ko from 'knockout';
import type { Sections } from './section';
import { Section } from './section';

class Model {
	sections : Section[];
	value    : ko.PureComputed<string>;

	constructor() {
		const sectionsJSON = this.getSections();
		this.sections      = sectionsJSON.map(({ title, hidden, styles }) => new Section({ title, hidden, styles }));

		this.value = ko.pureComputed({
			read  : () => this.combine(),
			write : (value: string) => {
				this.parse(value);
			},
		});
	}

	parse(value: string): void {
		const styles = value.split(':').filter((v) => v);

		this.sections
			.forEach(
				(section) => {
					section.styles
						.forEach((style) => {
							style.enabled(styles.includes(style.title));
						});
				},
			);
	}

	input(_model: Model, event: { target : { value : string } }): void {
		this.parse(event.target.value);
	}

	private getSections(): Sections {
		/* eslint-disable-next-line
				@typescript-eslint/no-var-requires,
				n/no-unpublished-require
			-- require json by local browser path
			TODO: rewrite when migrate to React
		*/
		return require('../../sections.json') as Sections;
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
}

export { Model };
