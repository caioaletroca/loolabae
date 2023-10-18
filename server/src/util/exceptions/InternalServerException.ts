import { BaseException } from "./BaseException";

export class InternalServerException extends BaseException {
	constructor(message: string = "Internal Server Error", data?: unknown) {
		super(message, data);
	}
}
