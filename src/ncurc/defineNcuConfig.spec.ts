import { describe, expect, it } from 'vitest';
import { defineNcuConfig } from './defineNcuConfig';

describe('defineNcuConfig', () => {
	it('keeps shared and project pins on their major and lets the rest go to latest', () => {
		const { target } = defineNcuConfig({
			pinnedMajor: { zod: { reason: 'vee-validate 4 needs zod 3', unpinWhen: 'vee-validate 5 is out' } },
		});

		expect(target('typescript')).toBe('minor');
		expect(target('zod')).toBe('minor');
		expect(target('vue')).toBe('latest');
	});
});
