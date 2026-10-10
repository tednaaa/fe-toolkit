import { describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';
import { withRouter } from './withRouter';

const Page = defineComponent({ name: 'Page', render: () => h('main') });

describe('withRouter', () => {
	it('stubs the components of nested and named-view routes', async () => {
		const router = withRouter([
			{ path: '/', component: Page, children: [{ path: 'pairs', components: { default: Page, sidebar: Page } }] },
		]);

		await router.push('/pairs');

		const components = router.currentRoute.value.matched.flatMap(record => Object.values(record.components ?? {}));

		expect(components).toHaveLength(3);
		expect(components).not.toContain(Page);
	});
});
