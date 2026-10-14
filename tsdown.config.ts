import { defineConfig } from 'tsdown';

export default defineConfig({
	platform: 'neutral',
	entry: {
		'ncurc': 'src/ncurc/index.ts',
		'env': 'src/env/index.ts',
		'testing/queries': 'src/testing/queries/index.ts',
		'testing/router': 'src/testing/router/index.ts',
		'testing/axios': 'src/testing/axios/index.ts',
	},
	publint: 'ci-only',
	attw: {
		enabled: 'ci-only',
		profile: 'esm-only',
		level: 'error',
	},
});
