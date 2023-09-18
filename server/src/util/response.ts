import { Response } from 'express';

export default function ApiResponse(res: Response) {
	return {
		async send<T>(data: T) {
			return await res.json({ data });
		}
	}
}
