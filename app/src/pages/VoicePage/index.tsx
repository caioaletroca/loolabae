import Page from '@/components/Page';
import Header, { HeaderBack, HeaderTitle } from '@/components/Page/Header';
import View from '@/components/Page/View';
import { useSettings } from '@/components/Settings';
import useSpeechSynthesis from '@/hooks/useSpeechSynthesis';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

export default function VoicePage() {
	const intl = useIntl();
	const navigate = useNavigate();
	const { options } = useSpeechSynthesis();
	const { voice, setSettings } = useSettings();

	const handleSelect = (option: SpeechSynthesisVoice) => {
		setSettings({ voice: option });
		navigate(-1);
	};

	return (
		<Page>
			<Header>
				<HeaderBack />
				<HeaderTitle
					title={intl.formatMessage({
						id: 'voice.title',
						defaultMessage: 'Voice',
					})}
				/>
			</Header>
			<View>
				<List>
					{options.map((option, index) => (
						<ListItemButton
							key={index}
							selected={voice === option}
							onClick={() => handleSelect(option)}>
							<ListItemText primary={option.name} />
						</ListItemButton>
					))}
				</List>
			</View>
		</Page>
	);
}
