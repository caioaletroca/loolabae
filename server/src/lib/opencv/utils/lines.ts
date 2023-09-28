import cv from "@techstark/opencv-js";
import { Line } from "../Line";

export function parse(lines: cv.Mat) {
	const output: Line[] = [];
	for (let i = 0; i < lines.rows; ++i) {
		const start = new cv.Point(lines.data32S[i * 4], lines.data32S[i * 4 + 1]);
		const end = new cv.Point(lines.data32S[i * 4 + 2], lines.data32S[i * 4 + 3]);

		output.push(new Line({ start, end }));
	}
	return output;
}

export function sortByLength(lines: Line[]) {
	return lines.sort((a, b) => b.length() - a.length());
}

export function angleLines(line1: Line, line2: Line) {
	return (line1.angle() + line2.angle()) / 2;
}
