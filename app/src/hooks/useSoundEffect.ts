import React from 'react';
import { Howl } from 'howler';

type UseSoundEffectProps = {
	baseUrl?: string;
};

type SoundCache = {
	[name: string]: Howl;
};

export default function useSoundEffect({
	baseUrl = '/sounds',
}: UseSoundEffectProps = {}) {
	const [sounds, _setSounds] = React.useState<SoundCache>({});

	const load = (name: string) => {
		return new Howl({
			src: [baseUrl + '/' + name + '.mp3'],
			volume: 0.4,
		});
	};

	const loadSounds = (names: string[]): SoundCache => {
		const cache = { ...sounds };

		return names.reduce((sum, name) => {
			if (!(name in sounds)) {
				return {
					...sum,
					[name]: load(name),
				};
			}

			return {
				...sum,
				[name]: cache[name],
			};
		}, {});
	};

	const play = (names: string[]) => {
		const s = loadSounds(names);
		s[names[0]].play();
		_setSounds(s);
	};

	return {
		play,
	};
}
