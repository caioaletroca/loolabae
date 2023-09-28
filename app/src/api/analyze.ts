import useSWRMutation from 'swr/mutation';
import { postFormDataFetcher } from '.';
import { ContextWeighted } from 'core';

export type Response<T = unknown> = {
	data: T;
};

export type ResponseError = {
	error: {
		type: string;
		message: string;
	};
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
		ResponseError,
		string,
		AnalyzeArgs
	>('/api/analyze', postFormDataFetcher, options);
}
