import { ContextType, ContextWeighted } from 'core';
import useSoundEffect from './useSoundEffect';
import useSpeechSynthesis from './useSpeechSynthesis';
import React from 'react';

export default function useControl() {
	const contexts = React.useRef<ContextWeighted[]>([]);
	const { playSequence, playBackground, stop } = useSoundEffect();

	const _setContexts = (c: ContextWeighted[]) => {
		contexts.current = c;
	};

	const _filterByType = (type: ContextType, contexts: ContextWeighted[]) => {
		return contexts.filter((c) => c.type === type).map((c) => c.name);
	};

	const handleEndSpeech = React.useCallback(() => {
		const effects = _filterByType('after', contexts.current);

		stop();
		playSequence(effects);
	}, [contexts, stop, playSequence]);

	const { speak } = useSpeechSynthesis({
		onEnd: handleEndSpeech,
	});

	const reproduce = (text: string, contexts: ContextWeighted[]) => {
		_setContexts(contexts);

		const backgroundSounds = _filterByType('during', contexts);

		playBackground(backgroundSounds);
		speak(text);
	};

	return {
		reproduce,
	};
}
