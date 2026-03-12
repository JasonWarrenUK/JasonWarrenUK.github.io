import { describe, it, expect } from 'vitest';
import { artefacts } from './artefacts';

describe('artefact data', () => {
	it('exports non-empty artefacts array', () => {
		expect(artefacts.length).toBeGreaterThan(0);
	});

	it('every artefact has required fields', () => {
		for (const a of artefacts) {
			expect(a.name).toBeTruthy();
			expect(a.repo).toBeTruthy();
			expect(a.description).toBeTruthy();
		}
	});
});
