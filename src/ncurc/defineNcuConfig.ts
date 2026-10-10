export interface PinnedMajor {
	reason: string;
	unpinWhen: string;
}

export interface NcuConfigOptions {
	pinnedMajor?: Record<string, PinnedMajor>;
}

export interface NcuConfig {
	cooldown: number;
	target: (name: string) => 'minor' | 'latest';
}

const sharedPinnedMajor: Record<string, PinnedMajor> = {
	'typescript': {
		reason: 'TS 7 ships without a JS compiler API, so vue-tsc and typescript-eslint cannot run on it',
		unpinWhen: 'vue-tsc and typescript-eslint both support TS 7 (expected with TS 7.1 and its API)',
	},
	'@types/node': {
		reason: 'types must match the Node major the project runs on (node 24)',
		unpinWhen: 'never; bump together with the Node version in the Dockerfile and CI',
	},
};

export function defineNcuConfig({ pinnedMajor = {} }: NcuConfigOptions = {}): NcuConfig {
	const pinned = new Set(Object.keys({ ...sharedPinnedMajor, ...pinnedMajor }));

	return {
		cooldown: 1,
		target: name => (pinned.has(name) ? 'minor' : 'latest'),
	};
}
