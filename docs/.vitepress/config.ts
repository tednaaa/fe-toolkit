import { defineConfig } from 'vitepress';

export default defineConfig({
	title: '@tednaaa/fe-tools',
	description: 'Personal frontend tools: env reading and Vitest helpers',
	srcDir: 'src',
	cleanUrls: true,

	themeConfig: {
		search: { provider: 'local' },
		outline: 'deep',
		socialLinks: [{ icon: 'github', link: 'https://github.com/tednaaa/fe-tools' }],

		nav: [
			{ text: 'Changelog', link: '/changelog' },
			{ text: 'Reference', link: '/reference/env' },
		],

		sidebar: [
			{ text: 'Changelog', link: '/changelog' },
			{
				text: 'Reference',
				items: [
					{ text: '/env', link: '/reference/env' },
					{ text: '/testing/queries', link: '/reference/queries' },
					{ text: '/testing/router', link: '/reference/router' },
					{ text: '/testing/axios', link: '/reference/axios' },
				],
			},
		],
	},
});
