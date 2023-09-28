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

export function filterByVerticality(lines: Line[], threshold: number) {
	return lines.filter(line => line.angleFirstQuadrant() > Math.PI - threshold);
}

export function filterByHorizontality(lines: Line[], threshold: number) {
	return lines.filter(line => line.angleFirstQuadrant() < threshold);
}

export function filterByVerticalAndHorizontal(lines: Line[], threshold: number) {
	const verticals = filterByVerticality(lines, threshold);
	const horizontals = filterByHorizontality(lines, threshold);
	return verticals.length > horizontals.length ? verticals : horizontals;
}

export function averageAngle(line1: Line, line2: Line) {
	return (line1.angle() + line2.angle()) / 2;
}
