import cv from "@techstark/opencv-js";

export class Line {
	start: cv.Point
	end: cv.Point

	constructor({ start, end, }: { start: cv.Point, end: cv.Point }) {
		this.start = start;
		this.end = end;
	}

	angle() {
		return Math.atan2(
			this.end.y - this.start.y,
			this.end.x - this.start.x
		);
	}

	length() {
		return Math.sqrt(
			Math.pow(this.end.x - this.start.x, 2) + Math.pow(this.end.y - this.start.y, 2)
		)
	}
}
