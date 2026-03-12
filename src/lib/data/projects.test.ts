import { describe, it, expect } from 'vitest';
import { impactProjects, explorationProjects, metaProjects } from './projects';

describe('project data', () => {
	it('exports non-empty impact projects', () => {
		expect(impactProjects.length).toBeGreaterThan(0);
	});

	it('exports non-empty exploration projects', () => {
		expect(explorationProjects.length).toBeGreaterThan(0);
	});

	it('exports non-empty meta projects', () => {
		expect(metaProjects.length).toBeGreaterThan(0);
	});

	it('every project has required fields', () => {
		const allProjects = [...impactProjects, ...explorationProjects, ...metaProjects];
		for (const p of allProjects) {
			expect(p.title).toBeTruthy();
			expect(p.repo).toBeTruthy();
			expect(p.description).toBeTruthy();
			expect(p.techLine).toBeTruthy();
		}
	});

	it('every repo path contains a slash (owner/repo format)', () => {
		const allProjects = [...impactProjects, ...explorationProjects, ...metaProjects];
		for (const p of allProjects) {
			expect(p.repo).toContain('/');
		}
	});
});
