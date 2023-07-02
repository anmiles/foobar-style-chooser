import ko from 'knockout';
import type { Sections } from '../types';
import { Section } from './section';

export { Model };

class Model {
	sections: Section[];
	toString: ko.Computed<string>;

	constructor() {
		const sectionsJSON = this.getSections();
		this.sections      = sectionsJSON.map(({ title, styles }) => new Section(title, styles));

		this.toString = ko.computed(() => `:${this.sections
			.map(
				(section) => section.styles
					.filter((style) => style.enabled())
					.map((style) => style.title),
			)
			.flat()
			.sort()
			.join(':')}:`);

	}

	private getSections(): Sections {
		return require('../../sections.json');
	}
}
