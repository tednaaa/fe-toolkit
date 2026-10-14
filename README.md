# @tednaaa/fe-tools

Personal frontend tools. Each entry is a separate subpath with its own optional peers.

Documentation for `/env` and `/testing/*` is at https://tednaaa.github.io/fe-tools/. Its source is in `docs/`.

```sh
pnpm add -D -E @tednaaa/fe-tools
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

## Development

- `pnpm dev` — the library in watch mode
- `pnpm docs:dev` — the documentation
- `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build`
