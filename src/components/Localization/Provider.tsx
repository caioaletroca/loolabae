import React from "react";
import { IntlProvider } from "react-intl";
import enMessages from '@/../locales/compiled/en-US.json';

export const LocalizationContext = React.createContext<{
	setLocale: (locale: string) => void;
}>({
	setLocale: () => {}
});

export function LocalizationProvider({
	children
}: React.PropsWithChildren) {
	const [locale, setLocale] = React.useState('en');
	const [messages, setMessages] = React.useState(enMessages);

	React.useEffect(() => {
		(async () => {
			const defaultLocale = localStorage.getItem('locale') ?? 'en';
			setLocale(defaultLocale);

			await loadLanguage(defaultLocale);
		})();
	}, []);

	const loadLanguage = async (locale: string) => {
		const module = await import(`../../../locales/compiled/${locale}.json`);
		setMessages(module.default);
	}

	const set = async (loc: string) => {
		setLocale(loc);
		await loadLanguage(loc);
		localStorage.setItem('locale', loc);
	}

	return (
		<IntlProvider
			key={locale}
			locale={locale}
			defaultLocale="en"
			messages={messages}>
			<LocalizationContext.Provider
				value={{
					setLocale: set
				}}>
				{children}
			</LocalizationContext.Provider>
		</IntlProvider>
	);
}
