import { HttpStatusCode } from 'axios';

export function statusText(status: number): string {
	return HttpStatusCode[status] ?? String(status);
}
