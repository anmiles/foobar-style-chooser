import ko from 'knockout';
import { Model } from '../model';
import { Section } from '../section';
import { Style } from '../style';

const originalStyle = jest.requireActual('../style').Style;
jest.mock<{Style: typeof Style.prototype.constructor}>('../style', () => ({
	Style : jest.fn().mockImplementation((title: string) => mockStyle
		? {
			title,
			enabled : () => styleCollection[title],
		}
		: new originalStyle(title),
	),
}));

let mockStyle: boolean;

const styleCollection: Record<string, boolean> = {
	style1 : true,
	style2 : false,
	style3 : true,
	style4 : false,
};

beforeEach(() => {
	mockStyle = true;
});

Model.prototype['getSections'] = () => require('../../../sections.sample.json');

describe('src/lib/model', () => {
	it('should construct model with 2 sections', () => {
		mockStyle = false;

		const model = new Model();

		expect(model).toMatchSnapshot();
	});

	describe('toString', () => {
		let computedSpy: jest.SpyInstance;

		beforeAll(() => {
			computedSpy = jest.spyOn(ko, 'computed').mockImplementation((func) => func as any);
		});

		afterAll(() => {
			computedSpy.mockRestore();
		});

		it('should return joined result of section.toString', () => {
			const model    = new Model();
			model.sections = [
				new Section('section1', [ 'style1', 'style2' ]),
				new Section('section2', [ 'style3', 'style4' ]),
			];

			expect(model.toString()).toEqual(':style1:style3:');
		});

		it('should sort styles alphabetically', () => {
			const model    = new Model();
			model.sections = [
				new Section('section2', [ 'style4', 'style3' ]),
				new Section('section1', [ 'style2', 'style1' ]),
			];

			expect(model.toString()).toEqual(':style1:style3:');
		});
	});
});
