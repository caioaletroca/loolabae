import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { IntlProvider } from 'react-intl';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage/index.tsx';
import RootLayout from './pages/root.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<IntlProvider messages={{}} locale="en" defaultLocale="en">
			<RouterProvider router={router} />
		</IntlProvider>
	</React.StrictMode>
);
