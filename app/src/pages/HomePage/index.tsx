import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import Page from '@/components/Page';
import View from '@/components/Page/View';
import { useAnalyze } from '@/api/analyze';
import ImageCapture from './ImageCapture';
import useSpeechSynthesis from '@/hooks/useSpeechSynthesis';
import useSoundEffect from '@/hooks/useSoundEffect';

export default function HomePage() {
	const { play } = useSoundEffect();
	const { speak } = useSpeechSynthesis();
	const { data: analyzeData, trigger } = useAnalyze({
		onSuccess: ({ data }) => {
			reproduce(data.text);
			play(data.context);
		},
	});

	const handleClick = async () => {};

	const handleChange = async (file: File) => {
		trigger({
			language: 'eng',
			image: file,
		});
	};

	const reproduce = async (text: string) => {
		speak(text);
	};

	return (
		<Page>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu">
						<span className="material-symbols-outlined">menu</span>
					</IconButton>
					<Typography variant="h6" component="div">
						Test
					</Typography>
				</Toolbar>
			</AppBar>
			<audio src="./test.mp3"></audio>
			<View>
				<ImageCapture onChange={handleChange} />
			</View>
		</Page>
	);
}
