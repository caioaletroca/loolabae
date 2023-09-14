import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import Page from '@/components/Page';
import View from '@/components/Page/View';
import api from '@/api';

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
	// const [test, setTest] = React.useState();
	// const { text, recognize } = useTesseract();

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

	const handleCapture = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.set('language', 'eng');
		formData.set('image', file);
		const { data } = await api.post('/api/analyze', formData);
		console.log(data);
	};

	// React.useEffect(() => {
	// 	const audioContext = new AudioContext();

	// 	// get the audio element
	// 	const audioElement = document.querySelector("audio");

	// 	if(text === '' || !audioElement) {
	// 		return;
	// 	}

	// 	// pass it into the audio context
	// 	// const track = audioContext.createMediaElementSource(audioElement!);

	// 	setTest(audioElement);
	// }, []);

	// React.useEffect(() => {
	// 	console.log(window.speechSynthesis.getVoices());

	// 	const u = new SpeechSynthesisUtterance(text);
	// 	u.voice = window.speechSynthesis.getVoices()[1];
	// 	window.speechSynthesis.speak(u);

	// 	if(!test) {
	// 		return;
	// 	}

	// 	test.play();
	// }, [text]);

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
				<div className="flex flex-col flex-1">
					<input
						accept="image/*"
						id="icon-button-file"
						type="file"
						capture="environment"
						onChange={handleCapture}
					/>
					<label htmlFor="icon-button-file">
						<IconButton
							color="primary"
							aria-label="upload picture"
							component="span">
							<span className="material-symbols-outlined">menu</span>
						</IconButton>
					</label>
					{/* <p>{text}</p> */}
					<Button onClick={handleClick}>Execute</Button>
					{/* <Button onClick={() => test.play()}>
						Play
					</Button> */}
				</div>
			</View>
		</Page>
	);
}
