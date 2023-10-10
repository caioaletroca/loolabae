import React from 'react';
import { IntlProvider } from 'react-intl';
import enMessages from '@/../locales/compiled/en-US.json';

export const LocalizationContext = React.createContext<{
	locale: string;
	setLocale: (locale: string) => void;
}>({
	locale: 'en-US',
	setLocale: () => {},
});

export function LocalizationProvider({ children }: React.PropsWithChildren) {
	const [locale, setLocale] = React.useState('en-US');
	const [messages, setMessages] = React.useState(enMessages);

	const getBrowserLanguage = () => {
		const language = navigator.language;

		if (language.includes('en')) {
			return 'en-US';
		}

		if (language.includes('pt')) {
			return 'pt-BR';
		}

		return 'en-US';
	};

	React.useEffect(() => {
		(async () => {
			const defaultLocale =
				localStorage.getItem('locale') ?? getBrowserLanguage();
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
					locale,
					setLocale: set,
				}}>
				{children}
			</LocalizationContext.Provider>
		</IntlProvider>
	);
}
