/* istanbul ignore file */
import './styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const root = createRoot(
	document.getElementById('root')!,
);
try {
	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
} catch (ex: unknown) {
	alert(ex);
}
