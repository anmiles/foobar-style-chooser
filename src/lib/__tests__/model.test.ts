import fs from 'fs';
import { Model } from '../model';
import { Section } from '../section';
import { Style } from '../style';

const enabledStyles: Record<string, boolean> = {
	style1 : true,
	style2 : false,
	style3 : true,
	style4 : false,
};

function createModel(): { model: Model, allStyles: Style[] } {
	const model = new Model();

	model.sections = [
		new Section({ title : 'section1', styles : [ 'style1', 'style2' ] }),
		new Section({ title : 'section2', styles : [ 'style3', 'style4' ] }),
	];

	const allStyles = model.sections.map((section) => section.styles).flat();

	allStyles.forEach((style) => {
		const enabled = enabledStyles[style.title];

		if (typeof enabled === 'undefined') {
			throw `Cannot index 'enabledStyles' with ${style.title}`;
		}

		style.enabled(enabled);
	});

	return {
		model,
		allStyles,
	};
}

if (!fs.existsSync('sections.json')) {
	fs.cpSync('sections.sample.json', 'sections.json');
}

jest.doMock('../../../sections.json', () => require('../../../sections.sample.json'));

describe('src/lib/model', () => {
	it('should construct model with 2 sections', () => {
		const model = new Model();

		expect(model).toMatchSnapshot();
	});

	describe('value', () => {
		describe('read', () => {
			it('should return joined result of section.value', () => {
				const { model } = createModel();

				expect(model.value()).toEqual(':style1:style3:');
			});

			it('should sort styles alphabetically', () => {
				const { model } = createModel();

				expect(model.value()).toEqual(':style1:style3:');
			});
		});

		describe('write', () => {
			it('should make styles enabled based on splitted value', () => {
				const { model, allStyles } = createModel();

				model.value(':style2:style4:');

				const enabledStyles = allStyles
					.filter((style) => style.enabled())
					.map((style) => style.title);

				expect(model.value()).toEqual(':style2:style4:');
				expect(enabledStyles).toEqual([ 'style2', 'style4' ]);
			});

			it('should sort styles alphabetically', () => {
				const { model, allStyles } = createModel();

				model.value(':style4:style2:');

				const enabledStyles = allStyles
					.filter((style) => style.enabled())
					.map((style) => style.title);

				expect(model.value()).toEqual(':style2:style4:');
				expect(enabledStyles).toEqual([ 'style2', 'style4' ]);
			});
		});

		describe('input', () => {
			it('should call parse function with string value', () => {
				const { model } = createModel();
				const parseSpy  = jest.spyOn(model as any, 'parse');

				const value = 'value';
				const event = { target : { value } };

				model['input'](model, event);

				expect(parseSpy).toHaveBeenCalledWith(value);
			});
		});

	});
});
