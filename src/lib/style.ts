import ko from 'knockout';
export { Style };

class Style {
	title: string;
	enabled: (value?: boolean) => boolean;

	constructor(title: string) {
		this.title   = title;
		this.enabled = ko.observable(false);
	}

	toggle() {
		this.enabled(!this.enabled());
	}
}
