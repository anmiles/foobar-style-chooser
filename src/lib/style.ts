import ko from 'knockout';

class Style {
	enabled : ko.Observable<boolean>;

	constructor(
		public title: string,
	) {
		this.enabled = ko.observable(false);
	}

	toggle(): void {
		this.enabled(!this.enabled());
	}
}

export { Style };
