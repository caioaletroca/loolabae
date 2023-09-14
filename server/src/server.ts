import path from 'path';
import dotenv from 'dotenv';
import express, { Router } from "express";
import postAnalyze from './analyze';
import multer from "multer";
import { startTesseract } from './tesseract/worker';

dotenv.config({
	path: path.resolve(process.cwd(), '..', '.env')
})

const app = express();

const router = Router();

app.use(express.json());

router.post('/api/analyze', multer().single('image'), postAnalyze);

app.use(router);

app.listen(process.env.API_PORT, async () => {
	await startTesseract();
	
	console.log(`Server is running [${process.env.API_PORT}]`);
});
