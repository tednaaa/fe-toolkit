import { afterEach, describe, expect, it } from 'vitest';
import { findElementByText, getElementByText } from './selectors';

describe('selectors', () => {
	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('matches the whole trimmed text, not a part of it', () => {
		document.body.innerHTML = '<li>  Projects  </li><li>Projects Overview</li>';

		expect(findElementByText('li', 'Projects')).toBe(document.querySelector('li'));
		expect(findElementByText('li', 'Overview')).toBeUndefined();
	});

	it('names the selector and the text when an element with the text is missing', () => {
		expect(() => getElementByText('span', 'Delete')).toThrow('getElementByText: no <span> element with text "Delete" found');
	});
});
