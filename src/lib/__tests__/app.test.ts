import ko from 'knockout';
import app from '../app';
import { Model } from '../model';

jest.mock<Partial<typeof ko>>('knockout', () => ({
	applyBindings : jest.fn(),
}));

jest.mock<Partial<{ Model : typeof Model }>>('../model', () => ({ Model : jest.fn().mockImplementation(() => model) }));

const model = { key : 'value' };

describe('src/lib/app', () => {
	describe('run', () => {
		it('should construct new model', () => {
			app.run();

			expect(Model).toHaveBeenCalledWith();
		});

		it('should bind model to document.body', () => {
			app.run();

			expect(ko.applyBindings).toHaveBeenCalledWith(model, document.body);
		});
	});
});
