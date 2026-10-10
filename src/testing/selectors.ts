import { hasText, orThrow } from './match';

export function findElement<T extends Element = Element>(selector: string): T | undefined {
	return document.querySelector<T>(selector) ?? undefined;
}

export function findElementByText<T extends Element = Element>(selector: string, text: string): T | undefined {
	return Array.from(document.querySelectorAll<T>(selector)).find(element => hasText(element.textContent, text));
}

export function getElement<T extends Element = Element>(selector: string): T {
	return orThrow(findElement<T>(selector), `getElement: no <${selector}> element found`);
}

export function getElementByText<T extends Element = Element>(selector: string, text: string): T {
	return orThrow(findElementByText<T>(selector, text), `getElementByText: no <${selector}> element with text "${text}" found`);
}
