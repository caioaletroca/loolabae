import React from 'react';
import { IntlProvider } from 'react-intl';
import enMessages from '@/../locales/compiled/en-US.json';

export const LocalizationContext = React.createContext<{
	setLocale: (locale: string) => void;
}>({
	setLocale: () => {},
});

export function LocalizationProvider({ children }: React.PropsWithChildren) {
	const [locale, setLocale] = React.useState('en-US');
	const [messages, setMessages] = React.useState(enMessages);

	React.useEffect(() => {
		(async () => {
			const defaultLocale = localStorage.getItem('locale') ?? 'en-US';
			setLocale(defaultLocale);

			await loadLanguage(defaultLocale);
		})();
	}, []);

	const loadLanguage = async (locale: string) => {
		const response = await fetch(`/locales/compiled/${locale}.json`);
		const messages = await response.json();
		setMessages(messages);
	};

	const set = async (loc: string) => {
		setLocale(loc);
		await loadLanguage(loc);
		localStorage.setItem('locale', loc);
	};

	return (
		<IntlProvider
			key={locale}
			locale={locale}
			defaultLocale="en"
			messages={messages}
			// TODO: Remove this
			onError={() => {}}>
			<LocalizationContext.Provider
				value={{
					setLocale: set,
				}}>
				{children}
			</LocalizationContext.Provider>
		</IntlProvider>
	);
}
