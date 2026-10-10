import { AxiosError, HttpStatusCode } from 'axios';
import { describe, expect, it } from 'vitest';
import { createAxiosError } from './createAxiosError';

describe('createAxiosError', () => {
	it('tells client errors from server errors by status', () => {
		expect(createAxiosError({}).code).toBe(AxiosError.ERR_BAD_REQUEST);
		expect(createAxiosError({}, HttpStatusCode.InternalServerError).code).toBe(AxiosError.ERR_BAD_RESPONSE);
	});
});
