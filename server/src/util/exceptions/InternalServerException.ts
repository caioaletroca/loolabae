import { BaseException } from "./BaseException";

export class InternalServerException extends BaseException {
	message: string = "Internal Server Error"
}
