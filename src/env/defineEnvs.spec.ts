import { describe, expect, it } from 'vitest';
import { defineEnvs } from './defineEnvs';

describe('defineEnvs', () => {
	it('reads trimmed values under the given keys', () => {
		const envs = defineEnvs({ DEV: false, VITE_API_URL: '  /api  ' }, { API_URL: 'VITE_API_URL' });

		expect(envs).toEqual({ API_URL: '/api' });
	});

	it('names every missing variable at once, treating blank values as missing', () => {
		expect(() => defineEnvs({ DEV: false, VITE_API_URL: '   ' }, {
			API_URL: 'VITE_API_URL',
			SENTRY_DSN: 'VITE_SENTRY_DSN',
		})).toThrow('Environment variables are required: VITE_API_URL, VITE_SENTRY_DSN');
	});

	it('uses the fallback when the variable is missing', () => {
		const envs = defineEnvs({ DEV: false }, { APP_VERSION: { name: 'VITE_APP_VERSION', fallback: 'dev' } });

		expect(envs.APP_VERSION).toBe('dev');
	});

	it('lets a variable optional for development be missing only in development', () => {
		const definitions = { SENTRY_DSN: { name: 'VITE_SENTRY_DSN', optionalForDevelopment: true } } as const;

		expect(defineEnvs({ DEV: true }, definitions).SENTRY_DSN).toBeUndefined();
		expect(() => defineEnvs({ DEV: false }, definitions)).toThrow('VITE_SENTRY_DSN');
	});
});
