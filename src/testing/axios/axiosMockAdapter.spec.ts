import { describe, expect, it } from 'vitest';
import { axiosMockAdapter } from './axiosMockAdapter';

describe('axiosMockAdapter', () => {
	it('resolves 2xx statuses and rejects the rest with the request config attached', async () => {
		const config = { url: '/pairs', headers: {} } as never;

		await expect(axiosMockAdapter(204, config)).resolves.toMatchObject({ status: 204 });
		await expect(axiosMockAdapter(404, config)).rejects.toMatchObject({ response: { status: 404 }, config });
	});
});
