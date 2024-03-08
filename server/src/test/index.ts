import fs from 'node:fs/promises';
import inputs from './input';
import path from 'path';
import { reduceFileSize } from '../util/file';
import { csv } from '../util/csv';
import { stringSimilarity } from "string-similarity-js";
import { analyzeContext, fixOCR } from '../services/openai';
import { recognize } from '../ocr';
import perfy from 'perfy';

const basePath = "./src/test";
const threshold = Number(process.env.OPEN_AI_THRESHOLD) || 0.75;

const sanitizeString = (text: string) => {
	return text.replace(/\n/g, ' ').replace(/"/g,'\'').replace(/\x09/g,'');
}

const csvFileName = () => {
	return (new Date()).toISOString().replace(/:/g, "-");
}

(async function main() {
	try {
		console.log("Starting process");
		const csvFile = csv<{
			name: string;
			fileRate: number; 
			fixedRate: number;
			correctContextsString: string;
			ocrTime: number;
			fixOcrTime: number;
			contextTime: number;
			contextPercentage: number;
			text?: string;
			fixedText?: string;
		}>();
		csvFile.setColumns([
			"name",
			"fileRate",
			"fixedRate",
			"correctContextsString",
			"ocrTime",
			"fixOcrTime",
			"contextTime",
			"contextPercentage",
			"text",
			"fixedText"
		]);

		for (const input of inputs) {
				console.log(`Started: ${input.name}`);

				const inputPath = path.resolve(basePath, 'data', `${input.name}.${input.extension}`);
				
				// Open files
				const file = await fs.readFile(inputPath);
				const originalText = sanitizeString(input.text);

				const reducedFile = await reduceFileSize(1 * 1024 * 1024, file);
				
				perfy.start('ocr' + input.name);
				const text = sanitizeString(await recognize(input.locale, reducedFile));
				const ocrTime = perfy.end('ocr' + input.name).time;
				const fileRate = stringSimilarity(originalText, text);

				perfy.start('fixOcr' + input.name);
				const fixedText = sanitizeString(await fixOCR(input.locale, text));
				const fixOcrTime = perfy.end('fixOcr' + input.name).time;
				const fixedRate = stringSimilarity(originalText, fixedText);

				perfy.start('context' + input.name);
				const contexts = await analyzeContext(fixedText);
				const contextTime = perfy.end('context' + input.name).time;
				const filteredContexts = contexts.filter(context => context.value >= threshold);
				const correctContexts = filteredContexts.filter(c => input.contexts.includes(c.name));
				const correctContextsString = correctContexts.map(c => c.name).join(', ');
				const contextPercentage = 
					filteredContexts.length !== 0 && input.contexts?.length === 0 ?
					0 :
					filteredContexts.length === 0 && input.contexts?.length === 0 ?
					100 :
					filteredContexts.length / input.contexts?.length * 100;

				csvFile.push({ name: input.name, fileRate, fixedRate, ocrTime, fixOcrTime, contextTime, contextPercentage, correctContextsString,
					text: `"${text}"`,
					fixedText: `"${fixedText}"`
				});

				console.log(`Finished: ${input.name}`);
		}

		await csvFile.toFile(path.resolve(basePath, 'out', `${csvFileName()}.csv`));

		console.log("Process finished");
	}
	catch(e) {
		console.error(e);
	}
})();
