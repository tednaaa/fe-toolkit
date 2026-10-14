# @tednaaa/fe-tools

Personal frontend tools. Each entry is a separate subpath with its own optional peers.

```sh
pnpm add -D @tednaaa/fe-tools
```

## `/ncurc`

Shared [npm-check-updates](https://github.com/raineorshine/npm-check-updates) config. A pinned package only gets minor updates, everything else goes to latest.

```js
// .ncurc.mjs
import { defineNcuConfig } from '@tednaaa/fe-tools/ncurc';

export default defineNcuConfig({
	pinnedMajor: {
		zod: { reason: 'vee-validate 4 needs zod 3', unpinWhen: 'vee-validate 5 is out' },
	},
});
```

> `typescript` and `@types/node` are always pinned.

## `/env`

Reads Vite env variables once and throws listing every missing one.

```ts
import { defineEnvs } from '@tednaaa/fe-tools/env';

export const envs = defineEnvs(import.meta.env, {
	API_URL: 'VITE_API_URL',
	APP_VERSION: { name: 'VITE_APP_VERSION', fallback: 'dev' },
	SENTRY_DSN: { name: 'VITE_SENTRY_DSN', optionalForDevelopment: true },
});
```

## `/testing`

### Selectors

`findElement`, `getElement`, `findElementByText`, `getElementByText` query `document`, for teleported menus and dialogs.

### Text finders

Needs `vue` and `@vue/test-utils`. `textFinders` adds `findElementByText`, `getElementByText`, `findComponentByText` and `getComponentByText` to every wrapper.

```ts
// vitest.setup.ts
import { textFinders } from '@tednaaa/fe-tools/testing';
import { config } from '@vue/test-utils';

config.plugins.VueWrapper.install(textFinders);
```

> Include `vitest.setup.ts` in the spec tsconfig, so the wrapper types know the new methods.

### `/testing/router`

Needs `vue` and `vue-router`. `withRouter(routes)` creates a memory-history router with every route component stubbed.

### `/testing/axios`

Needs `axios`.

- `createAxiosError(data, status)` — an `AxiosError` shaped like a real failed response, `400` by default
- `axiosMockAdapter(status, config)` — an adapter that resolves 2xx and rejects the rest
