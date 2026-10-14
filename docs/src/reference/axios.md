# @tednaaa/fe-tools/testing/axios

Needs `axios`. Fakes for specs that stub a service and need it to fail like the real API.

## createAxiosError

`createAxiosError(data, status = 400, config?)` — an `AxiosError` shaped like a real failed response: `response.data`, `response.status`, and `code` set to `ERR_BAD_RESPONSE` for 5xx and `ERR_BAD_REQUEST` otherwise. `statusText` is empty, as HTTP/2 servers send it.

```ts
import { createAxiosError } from '@tednaaa/fe-tools/testing/axios';
import { HttpStatusCode } from 'axios';

vi.spyOn(AuthService, 'changePassword').mockRejectedValueOnce(
	createAxiosError({ message: 'Current password is incorrect' }, HttpStatusCode.Unauthorized),
);
```

## axiosMockAdapter

`axiosMockAdapter(status, config)` — an axios adapter that resolves 2xx statuses with an empty body and rejects the rest with `createAxiosError`, the request config attached. Use it to test interceptors without a network.

```ts
import { axiosMockAdapter } from '@tednaaa/fe-tools/testing/axios';

apiInstance.defaults.adapter = config => axiosMockAdapter(401, config);
```
