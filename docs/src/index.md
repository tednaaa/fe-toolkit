# @tednaaa/fe-tools

Personal frontend tools. One package, one version, one [changelog](/changelog).

```sh
pnpm add -D -E @tednaaa/fe-tools
```

## What it ships

- [`@tednaaa/fe-tools/env`](/reference/env) — `defineEnvs` for `VITE_*` variables
- [`@tednaaa/fe-tools/testing/queries`](/reference/queries) — text finders for `@vue/test-utils` wrappers and `document` selectors
- [`@tednaaa/fe-tools/testing/router`](/reference/router) — a test router with stubbed route components
- [`@tednaaa/fe-tools/testing/axios`](/reference/axios) — fake axios errors and responses for specs

Each subpath has its own optional peers, so a project installs only what the subpaths it imports need.
