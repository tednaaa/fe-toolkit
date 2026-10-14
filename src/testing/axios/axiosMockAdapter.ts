import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { AxiosHeaders } from 'axios';
import { createAxiosError } from './createAxiosError';

function isSuccess(status: number): boolean {
	return status >= 200 && status < 300;
}

export async function axiosMockAdapter(status: number, config: InternalAxiosRequestConfig): Promise<AxiosResponse> {
	if (!isSuccess(status))
		throw createAxiosError({}, status, config);

	return { data: {}, status, statusText: '', headers: new AxiosHeaders(), config };
}
