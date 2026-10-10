import type { DOMWrapper, VueWrapper } from '@vue/test-utils';
import { hasText, orThrow } from '../match';

type ComponentSelector = Parameters<VueWrapper['findAllComponents']>[0];
type FoundComponent = ReturnType<VueWrapper['findAllComponents']>[number];

export interface ElementTextFinders {
	findElementByText: <T extends Element = Element>(selector: string, text: string) => DOMWrapper<T> | undefined;
	getElementByText: <T extends Element = Element>(selector: string, text: string) => DOMWrapper<T>;
}

export interface ComponentTextFinders {
	findComponentByText: (selector: ComponentSelector, text: string) => FoundComponent | undefined;
	getComponentByText: (selector: ComponentSelector, text: string) => FoundComponent;
}

function nameOf(selector: ComponentSelector): string {
	if (typeof selector === 'string')
		return selector;

	return 'name' in selector && typeof selector.name === 'string' ? selector.name : 'anonymous';
}

export function elementTextFinders(wrapper: VueWrapper | DOMWrapper<Node>): ElementTextFinders {
	function findElementByText<T extends Element = Element>(selector: string, text: string) {
		return wrapper.findAll<T>(selector).find(element => hasText(element.text(), text));
	}

	return {
		findElementByText,
		getElementByText<T extends Element = Element>(selector: string, text: string) {
			return orThrow(findElementByText<T>(selector, text), `getElementByText: no <${selector}> element with text "${text}" found`);
		},
	};
}

export function componentTextFinders(wrapper: VueWrapper): ComponentTextFinders {
	function findComponentByText(selector: ComponentSelector, text: string) {
		return wrapper.findAllComponents(selector).find(component => hasText(component.text(), text));
	}

	return {
		findComponentByText,
		getComponentByText(selector, text) {
			return orThrow(findComponentByText(selector, text), `getComponentByText: no <${nameOf(selector)}> component with text "${text}" found`);
		},
	};
}
