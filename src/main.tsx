import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { IntlProvider } from 'react-intl';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/root.tsx';
import { TesseractProvider } from './components/Tesseract/Provider.tsx';

import HomePage from './pages/HomePage';
import ConfigurationPage from './pages/ConfigurationPage';

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
			}
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<IntlProvider messages={{}} locale="en" defaultLocale="en">
			<TesseractProvider>
				<RouterProvider router={router} />
			</TesseractProvider>
		</IntlProvider>
	</React.StrictMode>
);
