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

export async function processImage(file: Buffer) {
	const src = await opencv.open(file);

	// Multiple steps of image processing
	const gray = opencv.grayScale(src, cv.COLOR_RGBA2GRAY);
	const blur = opencv.gaussianBlur(gray, { width: 5, height: 5 }, 2);
	const binary = opencv.adaptiveThreshold(blur, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 11, 2);
	const abs = opencv.convertScaleAbs(binary, 1.95, 50);
	await opencv.toFile(abs, './abs.png');

	// Convert result back into buffer
	const result = await opencv.toBuffer(abs);

	// Clear memory
	opencv.clear();

	return result;
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

export async function unskew(file: Buffer) {
	const src = await opencv.open(file);
	const gray = opencv.grayScale(src, cv.COLOR_RGBA2GRAY);

	// Check if the image is mostly white background
	let inverted = gray;
	if(cv.mean(gray) >= new cv.Scalar(127)) {
		inverted = opencv.invert(gray);
	}
	
	// Detect edges
	const edges = opencv.cannyEdges(inverted, 50, 150, 7);

	// Set the minimum line length to be at least 50% of the lower image size
	const minimumLength = Math.round(Math.min(edges.cols, edges.rows) * 0.5);

	// With the edges, get the 2 longests lines in the image
	// The lines are potentially text aligns,
	// In some way that they will provide a good angle of how much the page is tilted
	const rawLines = opencv.houghLinesP(edges, 1, Math.PI / 180, 100, minimumLength, 20);
	const lines = opencv.lines.parse(rawLines);
	
	// Sort lines by length and filter out non horizontal or vertical lines.
	// We expect the image to be into right orientation, lines closer to 45°
	// might be artifacts so don't trust it.
	// Long lines should be horizontal, since the text should be in right orientation.
	const [longLine1, longLine2] = 
		opencv.lines.filterByHorizontality(
			opencv.lines.sortByLength(lines),
			Math.PI / 8
		).slice(0, 2);
	
	// if(longLine1) {
	// 	cv.line(gray, longLine1.start, longLine1.end, new cv.Scalar(0, 0, 0), 10);
	// }
	// if(longLine2) {
	// 	cv.line(gray, longLine2.start, longLine2.end, new cv.Scalar(0, 0, 0), 10);
	// }
	await opencv.toFile(inverted, './inverted.png');
	await opencv.toFile(gray, './edges.png');
	let angle = 0;
	// Exit if no line was found
	if(lines.length === 0) {
		return file;
	}
	// Danger territory, only one line was found, we don't have much to work with
	else if(lines.length === 1) {
		angle = longLine1.angle();
	}
	else {
		// Calculate the average angle between the two longest lines
		angle = opencv.lines.averageAngle(longLine1, longLine2);
	}

	console.log(lines.length, longLine1, longLine2);

	// Correct skew by rotating the image using the lines angle
	const unskew = opencv.unskew(gray, angle, cv.INTER_LINEAR, cv.BORDER_CONSTANT);
	await opencv.toFile(unskew, './unskew.png');
	// Convert result back into buffer
	const result = await opencv.toBuffer(unskew);

	// Clear memory
	opencv.clear();

	return result;
}
