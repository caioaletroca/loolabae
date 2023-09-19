import React from 'react';

export type SettingsTheme = 'light' | 'dark' | 'system';

export type Settings = {
	theme: SettingsTheme;
	voice: SpeechSynthesisVoice;
};

const defaultSettings: Settings = {
	theme: 'system',
	voice: window.speechSynthesis.getVoices()[0],
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
		localStorage.setItem('voice', settings.voice.name);
	};

	const loadCache = () => {
		const options = window.speechSynthesis.getVoices();
		const voiceName = localStorage.getItem('voice');

		return {
			theme:
				(localStorage.getItem('theme') as SettingsTheme) ??
				defaultSettings.theme,
			voice: options.find((o) => o.name === voiceName) ?? defaultSettings.voice,
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
		_setSettings(loadCache());
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
