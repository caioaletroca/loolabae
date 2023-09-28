import { Response } from 'express';

export default function ApiResponse(res: Response) {
	return {
		async send<T>(data: T) {
			return await res.json({ data });
		},

		async error(status: number, type: string, message: string) {
			return await res.status(status).json({ error: { type, message }});
		},

		async BadRequestException(message: string = "Invalid Request") {
			return await this.error(400, "BadRequestException", message);
		},

		async BadResultException(message: string = "Not possible to analyze the image") {
			return await this.error(400, "BadResultException", message);
		}
	}
}
