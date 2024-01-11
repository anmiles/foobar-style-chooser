import ko from 'knockout';
export { Style };

class Style {
	enabled: ko.Observable<boolean>;

	constructor(
		public title: string,
	) {
		this.enabled = ko.observable(false);
	}

	toggle() {
		this.enabled(!this.enabled());
	}
}
