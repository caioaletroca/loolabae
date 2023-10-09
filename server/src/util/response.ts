import { Response } from 'express';
import { BaseException } from './exceptions';

export default function ApiResponse(res: Response) {
	return {
		async send<T>(data: T) {
			return await res.json({ data });
		},

		async sendError(error: BaseException) {
			return await res.status(error.status).json(error.toPayload());
		},
	}
}
