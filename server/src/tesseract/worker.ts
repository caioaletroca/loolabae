import { Worker, createWorker } from "tesseract.js";

let worker: Worker;

export function convertLocale(locale: string = "en-US") {
	return locale === "en-US" ? "eng" : "por"
}

export async function startTesseract() {
	worker = await createWorker({
		errorHandler: (err) => console.error(err)
	});
}

export async function detect(file: Buffer) {
	if(!worker) {
		await startTesseract();
	}

	await worker.loadLanguage("osd");
	await worker.initialize("osd");
	await worker.setParameters({
		user_defined_dpi: '300',
	});

	return worker.detect(file);
}

export async function recognize(lang: string, file: Buffer) {
	if(!worker) {
		await startTesseract();
	}
	
	await worker.loadLanguage(convertLocale(lang) + "+osd");
	await worker.initialize(convertLocale(lang) + "+osd");
	await worker.setParameters({
		user_defined_dpi: '300',
	});
    
	return worker.recognize(file, {
		rotateAuto: true,
	});
}
