import { Section } from '../section';

describe('src/lib/section', () => {
	it('should construct section', () => {
		const section = new Section({ title : 'section1', styles : [ 'style1', 'style2' ] });

		expect(section).toMatchSnapshot();
	});
});
