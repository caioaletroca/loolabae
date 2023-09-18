import Page from '@/components/Page';
import Header, { HeaderBack, HeaderTitle } from '@/components/Page/Header';
import View from '@/components/Page/View';
import useSpeechSynthesis from '@/hooks/useSpeechSynthesis';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

export default function VoicePage() {
	const intl = useIntl();
	const navigate = useNavigate();
	const { options } = useSpeechSynthesis();

	const handleSelect = (option: SpeechSynthesisVoice) => {
		console.log(option);
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
						<ListItemButton key={index} onClick={() => handleSelect(option)}>
							<ListItemText primary={option.name} />
						</ListItemButton>
					))}
				</List>
			</View>
		</Page>
	);
}
