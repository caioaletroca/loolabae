import { BaseException } from "./BaseException";

export class BadResultException extends BaseException {
	status: number = 400
	message: string = "Not possible to analyze the image"
}
