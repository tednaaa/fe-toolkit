import type { Router, RouteRecordRaw } from 'vue-router';
import { defineComponent, h } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';

const RouteStub = defineComponent({ name: 'RouteStub', render: () => h('div') });

function stubRoute(record: RouteRecordRaw): RouteRecordRaw {
	const stubbed = { ...record };

	if (stubbed.children)
		stubbed.children = stubbed.children.map(stubRoute);

	if ('component' in stubbed && stubbed.component)
		stubbed.component = RouteStub;

	if ('components' in stubbed && stubbed.components)
		stubbed.components = Object.fromEntries(Object.keys(stubbed.components).map(name => [name, RouteStub]));

	return stubbed;
}

export function withTestRouter(routes: readonly RouteRecordRaw[]): Router {
	return createRouter({
		history: createMemoryHistory(),
		routes: routes.map(stubRoute),
	});
}
