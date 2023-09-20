import { useSettings } from '@/components/Settings';
import React from 'react';

type UseSpeechSynthesisProps = {
	rate?: number;
	onEnd?: () => void;
};

export default function useSpeechSynthesis({
	rate = 0.8,
	onEnd,
}: UseSpeechSynthesisProps = {}) {
	const options = window.speechSynthesis.getVoices();
	const { voice } = useSettings();

	const utterance = React.useMemo(() => {
		const u = new SpeechSynthesisUtterance();
		u.voice = voice;
		u.rate = rate;
		u.addEventListener('end', () => onEnd?.());
		return u;
	}, [onEnd, rate, voice]);

	const speak = (text: string) => {
		utterance.text = text;
		window.speechSynthesis.speak(utterance);
	};

	const stop = () => window.speechSynthesis.cancel();

	return {
		speak,
		stop,
		options,
	};
}
