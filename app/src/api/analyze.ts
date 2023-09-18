import useSWRMutation from 'swr/mutation';
import { postFormDataFetcher } from '.';

type Response<T = unknown> = {
	data: T;
};

type RequestSWROptions<T = unknown> = {
	onSuccess?: (data: T) => void;
};

type AnalyzeArgs = {
	language: string;
	image: File;
};

type AnalyzeResponse = {
	text: string;
	context: string[];
};

export function useAnalyze(
	options?: RequestSWROptions<Response<AnalyzeResponse>>
) {
	return useSWRMutation<
		Response<AnalyzeResponse>,
		unknown,
		string,
		AnalyzeArgs
	>('/api/analyze', postFormDataFetcher, options);
}
