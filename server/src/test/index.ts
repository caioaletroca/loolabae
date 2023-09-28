import fs from 'node:fs/promises';
import { rotate, unskew } from '../services/opencv';
import input from './input';
import path from 'path';
import { saveFile } from '../util/file';
import cv from "@techstark/opencv-js";
import { detect } from '../tesseract/worker';
import opencv from '../lib/opencv';

const basePath = "./src/test";

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

(async function main() {
	try {
		await sleep(200);

		console.log("Starting process");

		input.forEach(async input => {
			const inputPath = path.resolve(basePath, 'data', `${input.name}.png`);
			const outputFolder = path.resolve(basePath, 'out', input.name);

			// Open file
			const file = await fs.readFile(inputPath);

			// Create output folder
			await fs.mkdir(path.parse(outputFolder).dir, { recursive: true });

			// Convert image into OpenCV
			const src = await opencv.open(file);

			// Multiple steps of image processing
			const gray = opencv.grayScale(src, cv.COLOR_RGBA2GRAY);
			await opencv.toFile(gray, path.resolve(outputFolder, './1-gray.png'));
			const blur = opencv.gaussianBlur(gray, { width: 5, height: 5 }, 2);
			await opencv.toFile(blur, path.resolve(outputFolder, './2-blur.png'));
			const binary = opencv.adaptiveThreshold(blur, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 11, 2);
			await opencv.toFile(binary, path.resolve(outputFolder, './3-binary.png'));
			const abs = opencv.convertScaleAbs(binary, 1.95, 50);
			await opencv.toFile(abs, path.resolve(outputFolder, './4-abs.png'));

			// Convert result back into buffer
			const processedImage = await opencv.toBuffer(abs);

			// Clear memory
			opencv.clear();

			// Fix rotation
			const { data: { orientation_degrees, orientation_confidence } } = await detect(processedImage);

			let rotatedImage = processedImage;
			if(orientation_confidence! > 10) {
				rotatedImage = await rotate(processedImage, orientation_degrees!);
				await saveFile(rotatedImage, path.resolve(outputFolder, '5-rotated.png'));
			}

			const unskewedImage = await unskew(rotatedImage);
			await saveFile(unskewedImage, path.resolve(outputFolder, '6-unskew.png'));

			console.log(`Finished: ${input.name}`);
		});
	}
	catch(e) {
		console.error(e);
	}
})();
