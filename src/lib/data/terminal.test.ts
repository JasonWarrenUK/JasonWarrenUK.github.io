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

	it('total animation duration is reasonable', () => {
		const totalDelay = irisSession.reduce((sum, frame) => sum + frame.delay, 0);
		expect(totalDelay).toBeGreaterThan(0);
		expect(totalDelay).toBeLessThan(30000);
	});

	it('first frame represents a command prompt', () => {
		const first = irisSession[0];
		expect(first.text.length).toBeGreaterThan(0);
	});
});
