import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export async function saveFile(file: Buffer, filePath: string) {
	await fs.mkdir(path.parse(filePath).dir, { recursive: true });
	await fs.writeFile(filePath, file);
}

export async function reduceFileSize(targetSize: number, file: Buffer): Promise<Buffer> {
	const decreaseStep = 20;
	const image = await sharp(Buffer.from(file)).webp().toBuffer();
	if(image.length < targetSize) {
		return image;
	}

	const results = await Promise.all(
		Array(5).fill(0)
			.map((_, index) => 100 - (decreaseStep * index))
			.map(step => 
				sharp(Buffer.from(file)).webp({
					quality: step,
					alphaQuality: 0,
					lossless: true
				}).toBuffer(),
			)
	);

	for(const img of results) {
		if(img.length < targetSize) {
			return img;
		}
	}

	return results.pop()!;
}
