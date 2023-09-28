import React from 'react';
import { Howl } from 'howler';
import { Context, ContextType, getFilteredContexts } from 'core';

type UseSoundEffectProps = {
	baseUrl?: string;
	volume?: number;
	fade?: number;
	onEndSequence?: () => void;
};

type SoundCache = {
	[name: string]: Howl;
};

export default function useSoundEffect({
	baseUrl = '/sounds',
	volume = 0.4,
	fade = 500,
	onEndSequence,
}: UseSoundEffectProps = {}) {
	const sounds = React.useRef<SoundCache>({});

	const _setSounds = (s: SoundCache) => {
		sounds.current = s;
	};

	const load = (name: string, type?: ContextType) => {
		return new Howl({
			src: [`${baseUrl}/${name}.mp3`],
			volume,
			loop: type === 'during',
		});
	};

	const loadSounds = (contexts: Context[]): SoundCache => {
		const cache = { ...sounds.current };

		return contexts.reduce((sum, c) => {
			if (!(c.name in cache)) {
				return {
					...sum,
					[c.name]: load(c.name, c.type as ContextType),
				};
			}

			return {
				...sum,
				[c.name]: cache[c.name],
			};
		}, {});
	};

	const playBackground = (names: string[]) => {
		if (names.length === 0) {
			return;
		}

		const s = loadSounds(getFilteredContexts(names));

		Object.values(s).map((instance) => {
			instance.play();
			instance.fade(0, volume, fade);
		});

		_setSounds(s);
	};

	const playSequence = (names: string[]) => {
		if (names.length === 0) {
			onEndSequence?.();
			return;
		}

		const s = loadSounds(getFilteredContexts(names));

		const _next = (instance: Howl) => {
			instance.play();
		};

		const instances = Object.values(s);
		for (let i = 0; i < instances.length; i++) {
			if (i === instances.length - 1) {
				instances[i].once('end', () => onEndSequence?.());
				continue;
			}

			instances[i].once('end', () => _next(instances[i + 1]));
		}

		instances[0].play();
		_setSounds(s);
	};

	const stop = React.useCallback(() => {
		Object.values(sounds.current).map((instance) => {
			instance.fade(volume, 0, fade);
		});
	}, [fade, volume]);

	return {
		sounds,
		playSequence,
		playBackground,
		stop,
	};
}
