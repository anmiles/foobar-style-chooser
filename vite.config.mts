import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		react(),
	],
	resolve: {
		extensions: [
			'.js', '.mjs', '.cjs',
			'.ts', '.cts', '.mts',
			'.jsx', '.tsx', '.json',
		],
	},
});
