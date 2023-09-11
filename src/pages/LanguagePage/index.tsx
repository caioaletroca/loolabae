import { languages, useLocalization } from "@/components/Localization";
import Page from "@/components/Page";
import Header, { HeaderTitle } from "@/components/Page/Header";
import View from "@/components/Page/View";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

export default function LanguagePage() {
	const intl = useIntl();
	const navigate = useNavigate();
	const { setLocale } = useLocalization();

	return (
		<Page>
			<Header>
				<HeaderTitle
					title={intl.formatMessage({
						id: 'language.title',
						defaultMessage: "Language"
					})}
				/>
			</Header>
			<View>
				<List>
					{languages.map(language => (
						<ListItemButton key={language.locale} onClick={() => {
							setLocale(language.locale);
							navigate(-1);
						}}>
							<ListItemText
								primary={language.name}
								secondary={intl.formatMessage(language.localizedName)}
							/>
						</ListItemButton>
					))}
				</List>
			</View>
		</Page>
	);
}
