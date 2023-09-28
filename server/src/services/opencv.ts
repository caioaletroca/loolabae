import cv from "@techstark/opencv-js";
import opencv from "../lib/opencv";

function parseOrientation(orientation: number): number {
	if(orientation === 0) {
		return 0;
	}
	else if(orientation === 90) {
		return cv.ROTATE_90_CLOCKWISE;
	}
	else if(orientation === 180) {
		return cv.ROTATE_180;
	}
	else if(orientation === 270) {
		return cv.ROTATE_90_COUNTERCLOCKWISE;
	}
	else {
		throw new Error('OpenCV: Invalid orientation');
	}
}

export async function rotate(file: Buffer, orientation: number) {
	// Do nothing if image is already upright
	if(orientation === 0) {
		return file;
	}

	const rotateCode = parseOrientation(orientation);
	
	const src = await opencv.open(file);
	const gray = opencv.grayScale(src, cv.COLOR_RGBA2GRAY);

	// Rotate the image accordantly keeping expected ratios
	const rotated = opencv.rotate(gray, rotateCode);

	// Convert result back into buffer
	const result = await opencv.toBuffer(rotated);
	
	// Clear memory
	opencv.clear();
	
	return result;
}

export async function processImage(file: Buffer) {
	const src = await opencv.open(file);

	// Multiple steps of image processing
	const gray = opencv.grayScale(src, cv.COLOR_RGBA2GRAY);
	const blur = opencv.gaussianBlur(gray, { width: 3, height: 3 }, 2);
	const binary = opencv.adaptiveThreshold(blur, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 11, 2);
	const abs = opencv.convertScaleAbs(binary, 1.95, 50);

	// Convert result back into buffer
	const result = await opencv.toBuffer(abs);

	// Clear memory
	opencv.clear();

	return result;
}

export async function unskew(file: Buffer) {
	const src = await opencv.open(file);
	const gray = opencv.grayScale(src, cv.COLOR_RGBA2GRAY);

	// Detect edges
	const edges = opencv.cannyEdges(gray, 50, 150, 7);

	// With the edges, get the 2 longests lines in the image
	// The lines are potentially page borders, or aligned in the text
	// In some way that they will provide a good angle of how much the page is tilted
	const rawLines = opencv.houghLinesP(edges, 1, Math.PI / 180, 100, 100, 10);
	const lines = opencv.lines.parse(rawLines);
	const [longLine1, longLine2] = opencv.lines.sortByLength(lines).slice(0, 2);

	// Calculate the angle between the two longest lines
	const averageAngle = opencv.lines.angleLines(longLine1, longLine2);

	// Correct skew by rotating the image using the lines angle
	const unskew = opencv.unskew(gray, averageAngle, cv.INTER_LINEAR, cv.BORDER_CONSTANT);
	await opencv.toFile(unskew, './unskew.png');
	// Convert result back into buffer
	const result = await opencv.toBuffer(unskew);

	// Clear memory
	opencv.clear();

	return result;
}
