# @tednaaa/fe-tools/testing/router

Needs `vue` and `vue-router`. `withRouter(routes)` creates a router on memory history with the real route records, and replaces every route component with a stub, including nested routes and named views. Navigation, guards and `useRoute` work without rendering the pages.

```ts
import { withRouter } from '@tednaaa/fe-tools/testing/router';
import { routes } from 'vue-router/auto-routes';

export const testRouter = withRouter([{ path: '/', redirect: '/pairs' }, ...routes]);
```
