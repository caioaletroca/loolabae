import { BaseException } from "./BaseException";

export class BadResultException extends BaseException {
	constructor(message: string = "Not possible to analyze the image", data?: unknown) {
		super(message, data);
	}
}
