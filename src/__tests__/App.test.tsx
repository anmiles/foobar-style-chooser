import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

jest.mock('../../config/sections.json', () => require('./sections.test.json'));

beforeEach(() => {
	render(<App />);
});

describe('src/App', () => {
	describe('section', () => {
		it('should be correctly rendered', () => {
			const sectionElements = screen.getAllByRole('section');

			expect(sectionElements).toMatchSnapshot();
		});

		it('should toggle style selection on click', async () => {
			const style = screen.getByTestId('style-piano');

			expect(style).toMatchSnapshot();

			await userEvent.click(style);

			expect(style).toMatchSnapshot();

			await userEvent.click(style);

			expect(style).toMatchSnapshot();
		});
	});

	describe('result', () => {
		it('should be rendered', () => {
			const resultElement = screen.getByTestId('result');

			expect(resultElement).toMatchSnapshot();
		});

		describe('value', () => {
			it('should contain no styles', () => {
				const valueElement = screen.getByTestId('value');

				expect(valueElement.textContent).toEqual(':');
			});

			it('should contain selected styles ordered alphabetically', async () => {
				await userEvent.click(screen.getByTestId('style-classical'));
				await userEvent.click(screen.getByTestId('style-active'));
				await userEvent.click(screen.getByTestId('style-relax'));
				await userEvent.click(screen.getByTestId('style-active'));
				await userEvent.click(screen.getByTestId('style-piano'));

				const valueElement = screen.getByTestId('value');

				expect(valueElement.textContent).toEqual(':Classical:Piano:Relax:');
			});
		});

		describe('buttons', () => {
			const readText  = jest.fn();
			const writeText = jest.fn();

			beforeEach(() => {
				Object.defineProperty(navigator, 'clipboard', {
					value: {
						readText,
						writeText,
					},
					writable: true,
				});
			});

			describe('copy', () => {
				it('should copy sorted result in clipboard', async () => {
					await userEvent.click(screen.getByTestId('style-classical'));
					await userEvent.click(screen.getByTestId('style-active'));
					await userEvent.click(screen.getByTestId('style-relax'));
					await userEvent.click(screen.getByTestId('style-active'));
					await userEvent.click(screen.getByTestId('style-piano'));

					await userEvent.click(screen.getByTestId('copy'));

					expect(writeText).toHaveBeenCalledWith(':Classical:Piano:Relax:');
				});
			});

			describe('paste', () => {
				beforeEach(() => {
					readText.mockResolvedValue(':Unknown:Piano::Relax:Classical:');
				});

				it('should paste sorted result from clipboard', async () => {
					await userEvent.click(screen.getByTestId('paste'));

					await waitFor(() => {
						const valueElement = screen.getByTestId('value');
						expect(valueElement.textContent).toEqual(':Classical:Piano:Relax:Unknown:');
					});
				});

				it('should apply style selections', async () => {
					await userEvent.click(screen.getByTestId('paste'));

					const sectionElements = screen.getAllByRole('section');

					expect(sectionElements).toMatchSnapshot();
				});
			});
		});
	});
});

