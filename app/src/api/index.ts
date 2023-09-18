/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

export const postFormDataFetcher = async (
	url: string,
	{ arg }: { arg: object }
) => {
	const body = new FormData();

	for (const [key, entry] of Object.entries(arg)) {
		body.append(key, entry);
	}

	const { data } = await api.post(url, body);
	return data;
};

export default api;
