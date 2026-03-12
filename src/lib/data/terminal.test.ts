import { describe, it, expect } from 'vitest';
import { irisSession } from './terminal';

describe('terminal data', () => {
	it('exports non-empty iris session frames', () => {
		expect(irisSession.length).toBeGreaterThan(0);
	});

	it('every frame has text and delay fields', () => {
		for (const frame of irisSession) {
			expect(typeof frame.text).toBe('string');
			expect(typeof frame.delay).toBe('number');
			expect(frame.delay).toBeGreaterThanOrEqual(0);
		}
	});

	it('last frame has zero delay', () => {
		const lastFrame = irisSession[irisSession.length - 1];
		expect(lastFrame.delay).toBe(0);
	});
});
