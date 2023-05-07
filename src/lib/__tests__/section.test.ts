import { Section } from '../section';

describe('src/lib/section', () => {
	it('should construct section', () => {
		const section = new Section('section1', [ 'style1', 'style2' ]);

		expect(section).toMatchSnapshot();
	});
});
