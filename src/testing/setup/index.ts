import type { ComponentTextFinders, ElementTextFinders } from './textFinders';
import { config } from '@vue/test-utils';
import { componentTextFinders, elementTextFinders } from './textFinders';

declare module '@vue/test-utils' {
	interface VueWrapper extends ElementTextFinders, ComponentTextFinders {}

	// eslint-disable-next-line unused-imports/no-unused-vars
	interface DOMWrapper<NodeType extends Node> extends ElementTextFinders {}
}

config.plugins.VueWrapper.install(wrapper => ({ ...elementTextFinders(wrapper), ...componentTextFinders(wrapper) }));
config.plugins.DOMWrapper.install(elementTextFinders);
