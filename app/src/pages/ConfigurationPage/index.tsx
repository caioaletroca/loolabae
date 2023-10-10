import Icon from '@/components/Icon';
import Page from '@/components/Page';
import Header, { HeaderBack, HeaderTitle } from '@/components/Page/Header';
import View from '@/components/Page/View';
import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

export default function ConfigurationPage() {
	const intl = useIntl();
	const navigate = useNavigate();

	return (
		<Page>
			<Header>
				<HeaderBack />
				<HeaderTitle
					title={intl.formatMessage({
						id: 'configuration.title',
						defaultMessage: 'Configuration',
					})}
				/>
			</Header>
			<View>
				<List>
					<ListItemButton
						aria-label={intl.formatMessage({
							id: 'configuration.themeButton',
							defaultMessage: 'Theme',
						})}
						onClick={() => navigate('/configuration/theme')}>
						<ListItemIcon>
							<Icon>dark_mode</Icon>
						</ListItemIcon>
						<ListItemText
							primary={intl.formatMessage({
								id: 'configuration.themeButton',
								defaultMessage: 'Theme',
							})}
						/>
					</ListItemButton>
					<ListItemButton
						aria-label={intl.formatMessage({
							id: 'configuration.languageButton',
							defaultMessage: 'Language',
						})}
						onClick={() => navigate('/configuration/language')}>
						<ListItemIcon>
							<Icon>language</Icon>
						</ListItemIcon>
						<ListItemText
							primary={intl.formatMessage({
								id: 'configuration.languageButton',
								defaultMessage: 'Language',
							})}
						/>
					</ListItemButton>
					<ListItemButton
						aria-label={intl.formatMessage({
							id: 'configuration.voiceButton',
							defaultMessage: 'Voice Selection',
						})}
						onClick={() => navigate('/configuration/voice')}>
						<ListItemIcon>
							<Icon>voice_selection</Icon>
						</ListItemIcon>
						<ListItemText
							primary={intl.formatMessage({
								id: 'configuration.voiceButton',
								defaultMessage: 'Voice Selection',
							})}
						/>
					</ListItemButton>
				</List>
			</View>
		</Page>
	);
}
