import Icon from "@/components/Icon";
import Page from "@/components/Page";
import Header, { HeaderTitle } from "@/components/Page/Header";
import View from "@/components/Page/View";
import { IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

export default function ConfigurationPage() {
	const intl = useIntl();
	const navigate = useNavigate();

	return (
		<Page>
			<Header>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="back"
					onClick={() => navigate(-1)}>
					<Icon>chevron_left</Icon>
				</IconButton>
				<HeaderTitle
					title={intl.formatMessage({
						id: 'configuration.title',
						defaultMessage: "Configuration"
					})}
				/>
			</Header>
			<View>
				<List>
					<ListItemButton onClick={() => navigate('/configuration/language')}>
						<ListItemIcon>
							<Icon>language</Icon>
						</ListItemIcon>
						<ListItemText
							primary={intl.formatMessage({
								id: "configuration.languageButton",
								defaultMessage: "Language"
							})}
						/>
					</ListItemButton>
					<ListItemButton>
						<ListItemIcon>
							<Icon>language</Icon>
						</ListItemIcon>
						<ListItemText
							primary={intl.formatMessage({
								id: "configuration.languageButton",
								defaultMessage: "Language"
							})}
						/>
					</ListItemButton>
				</List>
			</View>
		</Page>
	)
}
