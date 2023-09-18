import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import Page from '@/components/Page';
import View from '@/components/Page/View';
import { useAnalyze } from '@/api/analyze';
import 'react-html5-camera-photo/build/css/index.css';
import ImageCapture from './ImageCapture';
import useSpeechSynthesis from '@/hooks/useSpeechSynthesis';
import useSoundEffect from '@/hooks/useSoundEffect';

// const system = `
// 	Given the options of places below:

// 	* Church;
// 	* River;
// 	* Plaza;
// 	* Restaurant;

// 	Analyze the text on which place the story is happening and return a response as JSON containing all the places, and rating the probability between 0 and 1, where 0 means no probability, and 1 means highest probability.

// 	Don't answer any other words, just return a JSON.
// `;

export default function HomePage() {
	const { play } = useSoundEffect();
	const { speak } = useSpeechSynthesis();
	const { data: analyzeData, trigger } = useAnalyze({
		onSuccess: ({ data }) => {
			reproduce(data.text);
			play(data.context);
		},
	});

	const handleClick = async () => {
		// const test = "{\n  \"church\": 1,\n  \"river\": 0,\n  \"plaza\": 0,\n  \"restaurant\": 0\n}";
		// console.log(JSON.parse(test));
		// const completion = await openai.chat.completions.create({
		// 	messages: [
		// 		{
		// 			role: 'system',
		// 			content: system
		// 		},
		// 		{ role: 'user', content: 'Since I was sad, I decided to pray.' }
		// 	],
		// 	model: 'gpt-3.5-turbo',
		// });
		// console.log(completion.choices);
	};

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
