# @tednaaa/fe-tools/testing/queries

Helpers for Vitest with `@vue/test-utils`. Specs find elements by text or `aria-label`, never by class.

## Find by text

Needs `vue` and `@vue/test-utils`. `textFinders` adds text lookups to every wrapper. Install it once in `vitest.setup.ts`:

```ts
import { textFinders } from '@tednaaa/fe-tools/testing/queries';
import { config } from '@vue/test-utils';

config.plugins.VueWrapper.install(textFinders);
```

Include `vitest.setup.ts` in the spec tsconfig, so the wrapper types know the new methods.

- `wrapper.findElementByText(selector, text)` — the element whose trimmed text equals `text`, or `undefined`
- `wrapper.getElementByText(selector, text)` — the same, throws when nothing matches
- `wrapper.findComponentByText(component, text)`, `wrapper.getComponentByText(component, text)` — the same for components

```ts
await wrapper.getElementByText('button', 'Save').trigger('click');
```

> The text must match whole: `'Projects'` doesn't match `Projects Overview`.

## Teleported content

Dialogs, popovers and menus render outside the wrapper. `findElement`, `getElement`, `findElementByText` and `getElementByText` search the whole `document`:

```ts
import { getElementByText } from '@tednaaa/fe-tools/testing/queries';

getElementByText<HTMLElement>('[role="menuitem"]', 'Delete').click();
```

Mount with `attachTo: document.body` so the teleport target exists.
