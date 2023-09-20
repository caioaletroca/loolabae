import { ContextType, ContextWeighted } from 'core';
import useSoundEffect from './useSoundEffect';
import useSpeechSynthesis from './useSpeechSynthesis';
import React from 'react';

export default function useControl() {
	const [reproducing, setReproducing] = React.useState(false);
	const contexts = React.useRef<ContextWeighted[]>([]);
	const {
		playSequence,
		playBackground,
		stop: stopSound,
	} = useSoundEffect({
		onEndSequence: () => setReproducing(false),
	});

	const _setContexts = (c: ContextWeighted[]) => {
		contexts.current = c;
	};

	const _filterByType = (type: ContextType, contexts: ContextWeighted[]) => {
		return contexts.filter((c) => c.type === type).map((c) => c.name);
	};

	const handleEndSpeech = React.useCallback(() => {
		const effects = _filterByType('after', contexts.current);

		stopSound();
		playSequence(effects);
	}, [contexts, stopSound, playSequence]);

	const { speak, stop: stopSpeech } = useSpeechSynthesis({
		onEnd: handleEndSpeech,
	});

	const reproduce = (text: string, contexts: ContextWeighted[]) => {
		setReproducing(true);

		_setContexts(contexts);

		const backgroundSounds = _filterByType('during', contexts);

		playBackground(backgroundSounds);
		speak(text);
	};

	const cancel = () => {
		stopSound();
		stopSpeech();
		setReproducing(false);
	};

	return {
		reproducing,
		reproduce,
		cancel,
	};
}
