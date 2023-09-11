export default function useSpeechSynthesis() {
	const speak = (text: string) => {
		const u = new SpeechSynthesisUtterance(text);
		u.voice = window.speechSynthesis.getVoices()[1];
		window.speechSynthesis.speak(u);
	};

	return {
		speak,
	};
}
