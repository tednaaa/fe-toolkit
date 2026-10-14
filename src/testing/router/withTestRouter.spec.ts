import { describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';
import { withTestRouter } from './withTestRouter';

const Page = defineComponent({ name: 'Page', render: () => h('main') });

describe('withTestRouter', () => {
	it('stubs the components of nested and named-view routes', async () => {
		const router = withTestRouter([
			{ path: '/', component: Page, children: [{ path: 'pairs', components: { default: Page, sidebar: Page } }] },
		]);

		await router.push('/pairs');

		const components = router.currentRoute.value.matched.flatMap(record => Object.values(record.components ?? {}));

		expect(components).toHaveLength(3);
		expect(components).not.toContain(Page);
	});
});
