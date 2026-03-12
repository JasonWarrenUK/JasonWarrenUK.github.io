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
			expect(p.repo).toMatch(/^[^/]+\/[^/]+$/);
		}
	});

	it('no duplicate repo paths across all categories', () => {
		const allRepos = [
			...impactProjects.map((p) => p.repo),
			...explorationProjects.map((p) => p.repo),
			...metaProjects.map((p) => p.repo)
		];
		const unique = new Set(allRepos);
		const duplicates = allRepos.filter((r, i) => allRepos.indexOf(r) !== i);
		if (duplicates.length > 0) {
			// Nib shares a repo with The Work; this is intentional
			for (const dup of duplicates) {
				expect(dup).toBe('JasonWarrenUK/the-work');
			}
		}
	});

	it('liveUrl is a valid URL when present', () => {
		const allProjects = [...impactProjects, ...explorationProjects, ...metaProjects];
		for (const p of allProjects) {
			if (p.liveUrl) {
				expect(p.liveUrl).toMatch(/^https?:\/\//);
			}
		}
	});
});
