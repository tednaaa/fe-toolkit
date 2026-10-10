import type { InternalAxiosRequestConfig } from 'axios';
import { AxiosError, AxiosHeaders, HttpStatusCode } from 'axios';
import { statusText } from './statusText';

export function createAxiosError(
	data: unknown,
	status: HttpStatusCode = HttpStatusCode.BadRequest,
	config: InternalAxiosRequestConfig = { headers: new AxiosHeaders() },
): AxiosError {
	const code = status >= 500 ? AxiosError.ERR_BAD_RESPONSE : AxiosError.ERR_BAD_REQUEST;
	const response = { data, status, statusText: statusText(status), headers: new AxiosHeaders(), config };

	return new AxiosError(`Request failed with status code ${status}`, code, config, undefined, response);
}
