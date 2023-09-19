import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/root.tsx';
import { LocalizationProvider } from './components/Localization';

import HomePage from './pages/HomePage';
import ConfigurationPage from './pages/ConfigurationPage';
import LanguagePage from './pages/LanguagePage/index.tsx';
import VoicePage from './pages/VoicePage/index.tsx';
import { ThemeProvider } from './components/Theme';
import ThemePage from './pages/ThemePage/index.tsx';
import { SettingsProvider } from './components/Settings/Provider.tsx';

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
				element: <ConfigurationPage />,
			},
			{
				path: '/configuration/language',
				element: <LanguagePage />,
			},
			{
				path: '/configuration/voice',
				element: <VoicePage />,
			},
			{
				path: '/configuration/theme',
				element: <ThemePage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<LocalizationProvider>
			<SettingsProvider>
				<ThemeProvider>
					<RouterProvider router={router} />
				</ThemeProvider>
			</SettingsProvider>
		</LocalizationProvider>
	</React.StrictMode>
);
