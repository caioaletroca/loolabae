import { ContextWeighted, contexts, getFilteredContexts } from 'core';
import OpenAI from 'openai';

export const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	dangerouslyAllowBrowser: true,
});

function contextToString() {
	return `* ${contexts.map(c => c.name).join(';\n* ')};\n`;
}

function systemMessage() {
	return `
		Given the options of places below:

		${contextToString()}

		Analyze the text on which place the story is happening and return a response as JSON containing all the places, and rating the probability between 0 and 1, where 0 means no probability, and 1 means highest probability.

		Don't answer any other words, just return a JSON.
	`;
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
	return contexts.map(c => ({
		...c,
		value: 1
	}))
	// const completion = await openai.chat.completions.create({
	// 	messages: [
	// 		{
	// 			role: 'system',
	// 			content: systemMessage()
	// 		},
	// 		{ role: 'user', content: text }
	// 	],
	// 	model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
	// });

	// if(completion.choices.length === 0) {
	// 	return [];
	// }

	// return parseResponse(completion.choices[0].message.content);
}
