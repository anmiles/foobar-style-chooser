import { Style } from '../style';

const title = 'title';

describe('src/lib/style', () => {
	it('should construct style', () => {
		const style = new Style(title);

		expect(style).toMatchSnapshot();
	});

	describe('toggle', () => {
		it('should invert enabled', () => {
			const style = new Style(title);
			expect(style.enabled()).toEqual(false);

			style.toggle();
			expect(style.enabled()).toEqual(true);

			style.toggle();
			expect(style.enabled()).toEqual(false);
		});
	});
});
