import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';

const Item = defineComponent({ name: 'Item', setup: (_, { slots }) => () => h('li', slots.default?.()) });

function mountList() {
	return mount(() => h('ul', [h(Item, () => '  Projects  '), h(Item, () => 'Projects Overview')]));
}

describe('textFinders', () => {
	it('matches the whole trimmed text, not a part of it', () => {
		const wrapper = mountList();

		expect(wrapper.findElementByText('li', 'Projects')?.element).toBe(wrapper.findAll('li')[0]?.element);
		expect(wrapper.findElementByText('li', 'Overview')).toBeUndefined();
	});

	it('names the selector and the text when a component is missing', () => {
		const wrapper = mountList();

		expect(() => wrapper.getComponentByText(Item, 'Settings')).toThrow('getComponentByText: no <Item> component with text "Settings" found');
	});
});
