import { Request, Response } from 'express';
import { recognize } from './tesseract/worker';
import ApiResponse from './util/response';
import { analyzeContext } from './services/openai';

const threshold = Number(process.env.OPEN_AI_THRESHOLD) || 0.75;

export default async function postAnalyze(req: Request, res: Response) {
	if(!req.file) {
		return res.json({ error: "Image not defined" });
	}
	
	const { data: { text } } = await recognize(req.body.language, req.file.buffer);

	const contexts = await analyzeContext(text);

	const filteredContexts = contexts.filter(context => context.value >= threshold);
	
	return ApiResponse(res).send({
		text,
		context: filteredContexts
	});
}
