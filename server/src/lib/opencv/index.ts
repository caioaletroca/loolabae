import cv from "@techstark/opencv-js";
import sharp from "sharp";
import * as lines from './utils/lines';

const opencv = {
	// Utils
	lines: lines,

	// Memory Methods
	memory: [] as cv.Mat[],

	clear() {
		this.memory.map(mat => {
			if(!mat.isDeleted) {
				mat.delete();
			}
		});
		this.memory = [];
	},

	cache(mat: cv.Mat) {
		this.memory.push(mat);
	},

	// Input and Output Methods
	async open(file: Buffer) {
		const { data, info } = await sharp(Buffer.from(file))
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

    const { width, height } = info;

    const src = cv.matFromImageData({ data, width, height });
		this.cache(src);
		return src;
	},

	async toFile(src: cv.Mat, path: string) {
		this.cache(src);
		return sharp(Buffer.from(src.data), {
			raw: {
				width: src.cols,
				height: src.rows,
				channels: 1,
			}
		})
			.toFile(path);
	},

	async toBuffer(src: cv.Mat) {
		this.cache(src);
		return sharp(Buffer.from(src.data), {
			raw: {
					width: src.cols,
					height: src.rows,
					channels: 1,
			}
		})
			.toFormat('png')
			.toBuffer();
	},

	async toBuffer64(src: cv.Mat) {
		this.cache(src);
		const file = await this.toBuffer(src);
		return Buffer.from(file.toString('base64'), 'base64')
	},

	// Image Processing Methods
	grayScale(src: cv.Mat, code: number) {
		const out = new cv.Mat();
		cv.cvtColor(src, out, code);
		this.cache(out);
		return out;
	},

	gaussianBlur(src: cv.Mat, ksize: cv.Size, sigmaX: number) {
		const out = new cv.Mat();
		cv.GaussianBlur(src, out, ksize, sigmaX);
		this.cache(out);
		return out;
	},

	adaptiveThreshold(src: cv.Mat, maxValue: number, adaptiveMethod: number, thresholdType: number, blockSize: number, C: number) {
		const out = new cv.Mat();
		cv.adaptiveThreshold(src, out, maxValue, adaptiveMethod, thresholdType, blockSize, C);
		this.cache(out);
		return out;
	},

	convertScaleAbs(src: cv.Mat, alpha?: number | undefined, beta?: number | undefined) {
		const out = new cv.Mat();
		cv.convertScaleAbs(src, out, alpha, beta);
		this.cache(out);
		return out;
	},

	cannyEdges(src: cv.Mat, threshold1: number, threshold2: number, apertureSize?: number | undefined, L2gradient?: boolean | undefined) {
		const out = new cv.Mat();
		cv.Canny(src, out, threshold1, threshold2, apertureSize, L2gradient);
		this.cache(out);
		return out;
	},

	houghLinesP(src: cv.Mat, rho: number, theta: number, threshold: number, minLineLength?: number | undefined, maxLineGap?: number | undefined) {
		const out = new cv.Mat();
		cv.HoughLinesP(src, out, rho, theta, threshold, minLineLength, maxLineGap);
		this.cache(out);
		return out;
	},

	rotate(src: cv.Mat, rotateCode: number) {
		const out = new cv.Mat();
		cv.rotate(src, out, rotateCode);
		this.cache(out);
		return out;
	},

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	warpAffine(src: cv.Mat, M: cv.Mat, dsize: cv.Size, flags?: number | undefined, borderMode?: number | undefined, borderValue?: any) {
		const out = new cv.Mat();
		cv.warpAffine(src, out, M, dsize, flags, borderMode, borderValue);
		this.cache(out);
		return out;
	},

	// Advanced Methods
	unskew(
		src: cv.Mat,
		angle: number = 0,
		flags: number | undefined = cv.INTER_LINEAR,
		borderMode: number | undefined = cv.BORDER_CONSTANT,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		borderValue: any = new cv.Scalar(255, 255, 255, 255)
	) {
		const center = new cv.Point(src.cols / 2, src.rows / 2);
    const rotationMatrix = cv.getRotationMatrix2D(center, (angle * 180) / Math.PI, 1);
		return this.warpAffine(src, rotationMatrix, src.size(), flags, borderMode, borderValue);
	}
}

export default opencv;
