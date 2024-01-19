import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export async function saveFile(file: Buffer, filePath: string) {
	await fs.mkdir(path.parse(filePath).dir, { recursive: true });
	await fs.writeFile(filePath, file);
}

export async function reduceFileSize(targetSize: number, file: Buffer): Promise<Buffer> {
	const imageObject = await sharp(Buffer.from(file)).webp();
	const metadata = await imageObject.metadata();
	const image = await imageObject.toBuffer();

	if(!metadata.size) {
		return image;
	}

	const sourceSize = metadata.size;
	let width = metadata.width!;
	let height = metadata.height!;
	let currentImage = image;
	let currentSize = sourceSize;
	let remainingTrials = 20;
	while(remainingTrials-- && (currentSize > targetSize || currentSize > sourceSize)) {
		width = Math.round(width * 0.95);
    height = Math.round(height * 0.95);
		currentImage = await sharp(Buffer.from(file)).webp().resize(width, height).toBuffer();
		currentSize = currentImage.length;
	}

	return currentImage;
}
