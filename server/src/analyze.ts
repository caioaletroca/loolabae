import { Request, Response } from 'express';
import { recognize } from '@/ocr';
import ApiResponse from '@/util/response';
import { analyzeContext, fixOCR } from '@/services/openai';
import { BadRequestException, BaseException } from '@/util/exceptions';

const threshold = Number(process.env.OPEN_AI_THRESHOLD) || 0.75;

export default async function postAnalyze(req: Request, res: Response) {
	try {
		if(!req.file) {
			throw new BadRequestException("Invalid image");
		}
		
		// Recognize text in the image
		console.time('text');
		const text = await recognize(req.body.locale, req.file.buffer);
		console.timeEnd('text');
		
		// Fix any OCR mistakes using GPT4
		console.time('fix');
		const fixedText = await fixOCR(req.body.locale, text);
		console.timeEnd('fix');
	
		console.time('context');
		const contexts = await analyzeContext(fixedText);
		console.timeEnd('context');
		
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
			return ApiResponse(res).sendError(new BaseException(error.message, error));
		}

		console.error(error);

		throw error;
	}
}
