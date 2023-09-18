export default function useSpeechSynthesis() {
	const options = window.speechSynthesis.getVoices();

	const speak = (text: string) => {
		const u = new SpeechSynthesisUtterance(text);
		u.voice = window.speechSynthesis.getVoices()[1];
		u.rate = 0.7;
		window.speechSynthesis.speak(u);
	};

	return {
		speak,
		options,
	};
}
