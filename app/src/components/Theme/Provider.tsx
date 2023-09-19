import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { darkTheme } from './dark';
import React from 'react';
import { useSettings } from '../Settings';
import { lightTheme } from './light';

export type ThemeProviderProps = React.PropsWithChildren;

export function ThemeProvider({ children }: React.PropsWithChildren) {
	const { theme } = useSettings();

	const currentTheme = React.useMemo(() => {
		if (theme === 'system') {
			// Check to see if Media-Queries are supported
			if (window.matchMedia) {
				// Check if the dark-mode Media-Query matches
				if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
					return darkTheme;
				} else {
					return lightTheme;
				}
			}
		}

		return theme === 'dark' ? darkTheme : lightTheme;
	}, [theme]);

	return (
		<MuiThemeProvider theme={currentTheme}>
			<CssBaseline />
			{children}
		</MuiThemeProvider>
	);
}
