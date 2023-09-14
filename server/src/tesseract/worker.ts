import { Worker, createWorker } from "tesseract.js";

let worker: Worker;

export async function startTesseract() {
	worker = await createWorker();
}

export async function recognize(lang: string, file: Buffer) {
	await worker.loadLanguage(lang);
	await worker.initialize(lang);

	const buffer64 = Buffer.from(file.toString('base64'), 'base64');

	return worker.recognize(buffer64);
}
