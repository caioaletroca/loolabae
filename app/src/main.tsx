import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/root.tsx';
import { TesseractProvider } from './components/Tesseract';
import { LocalizationProvider } from './components/Localization';

import HomePage from './pages/HomePage';
import ConfigurationPage from './pages/ConfigurationPage';
import LanguagePage from './pages/LanguagePage/index.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/configuration',
				element: <ConfigurationPage />
			},
			{
				path: '/configuration/language',
				element: <LanguagePage />
			}
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<LocalizationProvider>
			<TesseractProvider>
				<RouterProvider router={router} />
			</TesseractProvider>
		</LocalizationProvider>
	</React.StrictMode>
);
