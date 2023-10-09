import { Request, Response } from 'express';
import { detect, recognize } from './tesseract/worker';
import ApiResponse from './util/response';
import { analyzeContext, fixOCR } from './services/openai';
import { reduceFileSize, saveFile } from './util/file';
import { BadRequestException, BaseException } from './util/exceptions';

const threshold = Number(process.env.OPEN_AI_THRESHOLD) || 0.75;

export default async function postAnalyze(req: Request, res: Response) {
	try {
		if(!req.file) {
			throw new BadRequestException("Invalid image");
		}
		// Reduce file size/weight for OCR Space API
		const reducedFile = await reduceFileSize(1 * 1000 * 1000, req.file.buffer);
		await saveFile(reducedFile, './test.webp');
	
		// Recognize text in the image
		const text = await recognize(req.body.locale, reducedFile);
		// console.log(text, reducedFile.length);
		// Fix any OCR mistakes using GPT4
		const fixedText = await fixOCR(req.body.locale, text);
	
		const contexts = await analyzeContext(fixedText);
		
		const filteredContexts = contexts.filter(context => context.value >= threshold);
		
		return ApiResponse(res).send({
			text: fixedText,
			context: filteredContexts
		});
	}
	catch(error: unknown) {
		if(error instanceof BaseException) {
			return ApiResponse(res).sendError(error);
		}

		if(error instanceof Error) {
			return ApiResponse(res).sendError(new BaseException(error.message, error.stack));
		}

		throw error;
	}
}
