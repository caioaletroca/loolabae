import { Request, Response } from 'express';
import { recognize } from './tesseract/worker';

export default async function postAnalyze(req: Request, res: Response) {
	if(!req.file) {
		return res.json({ error: "Image not defined" });
	}
	
	const { data: { text } } = await recognize(req.body.language, req.file.buffer);
	
	return res.json({ text });
}
