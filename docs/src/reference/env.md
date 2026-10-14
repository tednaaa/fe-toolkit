# @tednaaa/fe-tools/env

`defineEnvs(import.meta.env, definitions)` reads `VITE_*` variables once at startup, trims them and throws a `TypeError` naming every missing one.

```ts
import { defineEnvs } from '@tednaaa/fe-tools/env';

export const envs = defineEnvs(import.meta.env, {
	API_URL: 'VITE_API_URL',
	APP_VERSION: { name: 'VITE_APP_VERSION', fallback: 'dev' },
	SENTRY_DSN: { name: 'VITE_SENTRY_DSN', optionalForDevelopment: true },
});
```

## Definitions

### A string
- Names a required variable. Its type is `string`.

### `fallback`
- Used when the variable is missing. Its type is `string`.

### `optionalForDevelopment: true`
- Allows the variable to be missing while `import.meta.env.DEV` is true: `vite dev` and Vitest.
- A production build still requires it.
- Its type is `string | undefined`.

> `fallback` and `optionalForDevelopment` can't be combined: a fallback already makes the variable optional.

## Missing values

- An empty or whitespace-only value counts as missing.
- All missing variables are reported at once: `Environment variables are required: VITE_API_URL, VITE_SENTRY_DSN`.

The rest of the app imports `envs` and never reads `import.meta.env`.
