import Icon from '@/components/Icon';
import Page from '@/components/Page';
import Header, { HeaderBack, HeaderTitle } from '@/components/Page/Header';
import View from '@/components/Page/View';
import { SettingsTheme, useSettings } from '@/components/Settings';
import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

export default function ThemePage() {
	const intl = useIntl();
	const navigate = useNavigate();
	const { theme, setSettings } = useSettings();

	const handleClick = (option: SettingsTheme) => {
		setSettings({ theme: option });
		navigate(-1);
	};

	return (
		<Page>
			<Header>
				<HeaderBack />
				<HeaderTitle
					title={intl.formatMessage({
						id: 'theme.title',
						defaultMessage: 'Theme',
					})}
				/>
			</Header>
			<View>
				<List>
					<ListItemButton
						selected={theme === 'system'}
						onClick={() => handleClick('system')}>
						<ListItemIcon>
							<Icon>dns</Icon>
						</ListItemIcon>
						<ListItemText
							primary={intl.formatMessage({
								id: 'theme.systemButton',
								defaultMessage: 'System Default',
							})}
						/>
					</ListItemButton>
					<ListItemButton
						selected={theme === 'light'}
						onClick={() => handleClick('light')}>
						<ListItemIcon>
							<Icon>light_mode</Icon>
						</ListItemIcon>
						<ListItemText
							primary={intl.formatMessage({
								id: 'theme.lightButton',
								defaultMessage: 'Light Mode',
							})}
						/>
					</ListItemButton>
					<ListItemButton
						selected={theme === 'dark'}
						onClick={() => handleClick('dark')}>
						<ListItemIcon>
							<Icon>dark_mode</Icon>
						</ListItemIcon>
						<ListItemText
							primary={intl.formatMessage({
								id: 'theme.darkButton',
								defaultMessage: 'Dark Mode',
							})}
						/>
					</ListItemButton>
				</List>
			</View>
		</Page>
	);
}
