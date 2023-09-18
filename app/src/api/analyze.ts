import useSWRMutation from 'swr/mutation';
import { postFormDataFetcher } from '.';
import { ContextWeighted } from 'core';

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
	context: ContextWeighted[];
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
