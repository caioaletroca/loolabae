import { config } from '@/lib/config';
import { ContextWeighted, contexts, getFilteredContexts } from 'core';
import OpenAI from 'openai';

function convertLocale(locale: string = "en-US") {
	return locale === "en-US" ? "english" : "portuguese";
}

function contextToString() {
	return `* ${contexts.map(c => c.name).join(';\n* ')};\n`;
}

function parseResponse(response?: string | null) {
	try {
		if(!response) {
			return [];
		}

		const values = JSON.parse(response) as { [name: string]: number };

		return getFilteredContexts(Object.keys(values)).map(c => ({
			...c,
			value: values[c.name]
		}));
	}
	catch(e) {
		return [];
	}
}

export async function analyzeContext(text: string): Promise<ContextWeighted[]> {
	const openai = new OpenAI({
		apiKey: await config.get('OPENAI_API_KEY')
	});

	const system = `
		Given the options of places below:

		${contextToString()}

		Analyze the text on which place the story is happening and return a response as JSON containing all the places, and rating the probability between 0 and 1, where 0 means no probability, and 1 means highest probability, you can use decimal numbers if you want.

		Don't answer any other words, just return a JSON.
	`;

	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: 'system',
				content: system
			},
			{ role: 'user', content: text }
		],
		model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
		temperature: 0,
	});

	if(completion.choices.length === 0) {
		return [];
	}

	return parseResponse(completion.choices[0].message.content);
}

export async function fixOCR(lang: string, text: string): Promise<string> {
	const openai = new OpenAI({
		apiKey: await config.get('OPENAI_API_KEY')
	});
	
	const system = `
		Given the text, analyze the context of the text and clean up any non-sense or non-textual words and characters and correct grammar and spelling of the following text.
		If the text is correct, don't change anything, just respond with the text back
		Avoid using swearing or bad wording.
		The text is in ${convertLocale(lang)}.
	`;

	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: 'system',
				content: system
			},
			{ role: 'user', content: text }
		],
		model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
		temperature: 1,
	});

	if(completion.choices.length === 0) {
		return text;
	}

	return completion.choices[0].message.content!;
}
