export class BaseException {
	status: number = 500;
	type: string = "BaseException";
	message: string;
	data: unknown;

	constructor(message: string = "Unknow Exception", data?: unknown) {
		this.type = this.constructor.name;
		this.message = message;
		this.data = data;
	}

	toPayload() {
		return {
			error: {
				status: this.status,
				type: this.type,
				message: this.message,
				data: this.data
			}
		}
	}
}
