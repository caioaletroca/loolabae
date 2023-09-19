import React from 'react';

export type SettingsTheme = 'light' | 'dark' | 'system';

export type Settings = {
	theme: SettingsTheme;
};

const defaultSettings: Settings = {
	theme: 'system',
};

export const SettingsContext = React.createContext<
	Settings & {
		setSettings: (set: Partial<Settings>) => void;
	}
>({
	...defaultSettings,
	setSettings: () => {},
});

export function SettingsProvider({ children }: React.PropsWithChildren) {
	const [settings, _setSettings] = React.useState<Settings>(defaultSettings);

	const saveCache = (settings: Settings) => {
		localStorage.setItem('theme', settings.theme);
	};

	const loadCache = () => {
		return {
			theme:
				(localStorage.getItem('theme') as SettingsTheme) ??
				defaultSettings.theme,
		};
	};

	const setSettings = (set: Partial<Settings>) => {
		_setSettings((settings) => {
			const newSettings = { ...settings, ...set };
			saveCache(newSettings);
			return newSettings;
		});
	};

	React.useEffect(() => {
		setSettings(loadCache());
	}, []);

	return (
		<SettingsContext.Provider
			value={{
				...settings,
				setSettings,
			}}>
			{children}
		</SettingsContext.Provider>
	);
}
