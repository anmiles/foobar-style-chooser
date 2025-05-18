import { configs, globals } from '@anmiles/eslint-config';
import type { Linter } from 'eslint';

export default [
	...configs.base,
	...configs.ts,
	...configs.jest,
	...configs.react,

	{
		ignores: [
			'coverage/*',
			'dist/*',
		],
	},

	{
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},
] as Linter.Config[];
