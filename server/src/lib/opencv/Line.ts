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

	anglePositive() {
		const angle = this.angle();
		return angle < 0 ? angle + Math.PI : angle;
	}

	angleFirstQuadrant() {
		const angle = this.anglePositive();
		return angle > Math.PI / 2 ? angle - (Math.PI / 2) : angle;
	}

	length() {
		return Math.sqrt(
			Math.pow(this.end.x - this.start.x, 2) + Math.pow(this.end.y - this.start.y, 2)
		)
	}
}
