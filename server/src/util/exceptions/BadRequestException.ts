import { BaseException } from "./BaseException";

export class BadRequestException extends BaseException {
	status: number = 400
	message: string = "Invalid request"
}
