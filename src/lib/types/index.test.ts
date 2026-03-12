import { describe, it, expect } from 'vitest';
import { accentColors } from '$lib/constants';

describe('types module', () => {
	it('exports accentColors with all four accent values', () => {
		expect(accentColors.primary).toBe('var(--accent-primary)');
		expect(accentColors.warm).toBe('var(--accent-warm)');
		expect(accentColors.secondary).toBe('var(--accent-secondary)');
		expect(accentColors.none).toBe('var(--border)');
	});

	it('accentColors has exactly four keys', () => {
		expect(Object.keys(accentColors)).toHaveLength(4);
	});
});
