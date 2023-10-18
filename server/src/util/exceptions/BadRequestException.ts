import { BaseException } from "./BaseException";

export class BadRequestException extends BaseException {
	status: number = 400

	constructor(message: string = "Invalid request", data?: unknown) {
		super(message, data);
	}
}
