import path from 'path';
import dotenv from 'dotenv';
import express, { Router } from "express";

dotenv.config({
	path: path.resolve(process.cwd(), '..', '.env')
})

const app = express();

const router = Router();

app.use(express.json());

app.use(router);

app.listen(process.env.API_PORT, () => {
	console.log(`Server is running [${process.env.API_PORT}]`);
});
