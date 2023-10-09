import path from 'path';
import dotenv from 'dotenv';
import express, { Request, Response, Router } from "express";
import cors from 'cors';
import multer from "multer";

dotenv.config({
	path: path.resolve(process.cwd(), '.env')
});

import postAnalyze from './analyze';

const app = express();

const router = Router();

app.use(express.json());
app.use(cors());

app.set('trust proxy', true);

router.get('/api', (_req: Request, res: Response) => {
	return res.json({ message: 'Hello World!!!' });
});

router.post('/api/analyze', multer().single('image'), postAnalyze);

app.use(router);

app.listen(process.env.PORT, async () => {
	console.log(`Server is running [${process.env.PORT}]`);
});
