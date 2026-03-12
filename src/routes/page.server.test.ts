import { describe, it, expect } from 'vitest';
import { attachGitHubData } from '$lib/utils/github';
import type { ProjectGitHubData } from '$lib/types';

const mockGithub: ProjectGitHubData = {
	languages: { TypeScript: 5000 },
	commitCount: 42,
	lastUpdated: '2024-01-01T00:00:00Z',
	contributors: 3,
	stars: 5,
	openIssues: 2
};

describe('attachGitHubData', () => {
	it('attaches matching github data to projects', () => {
		const projects = [
			{ title: 'A', repo: 'owner/a', description: 'desc', techLine: 'TS' }
		];
		const githubData: Record<string, ProjectGitHubData | null> = {
			'owner/a': mockGithub
		};

		const result = attachGitHubData(projects, githubData);
		expect(result).toHaveLength(1);
		expect(result[0].github).toEqual(mockGithub);
		expect(result[0].title).toBe('A');
	});

	it('sets github to null when repo has no data', () => {
		const projects = [
			{ title: 'B', repo: 'owner/b', description: 'desc', techLine: 'TS' }
		];
		const githubData: Record<string, ProjectGitHubData | null> = {};

		const result = attachGitHubData(projects, githubData);
		expect(result[0].github).toBeNull();
	});

	it('sets github to null when repo data is explicitly null', () => {
		const projects = [
			{ title: 'C', repo: 'owner/c', description: 'desc', techLine: 'TS' }
		];
		const githubData: Record<string, ProjectGitHubData | null> = {
			'owner/c': null
		};

		const result = attachGitHubData(projects, githubData);
		expect(result[0].github).toBeNull();
	});

	it('handles multiple projects with mixed data', () => {
		const projects = [
			{ title: 'D', repo: 'owner/d', description: 'desc', techLine: 'TS' },
			{ title: 'E', repo: 'owner/e', description: 'desc', techLine: 'TS' },
			{ title: 'F', repo: 'owner/f', description: 'desc', techLine: 'TS' }
		];
		const githubData: Record<string, ProjectGitHubData | null> = {
			'owner/d': mockGithub,
			'owner/e': null
		};

		const result = attachGitHubData(projects, githubData);
		expect(result[0].github).toEqual(mockGithub);
		expect(result[1].github).toBeNull();
		expect(result[2].github).toBeNull();
	});

	it('preserves all original project fields', () => {
		const projects = [
			{ title: 'G', repo: 'owner/g', description: 'A description', techLine: 'SvelteKit / TS', liveUrl: 'https://example.com' }
		];
		const githubData: Record<string, ProjectGitHubData | null> = {
			'owner/g': mockGithub
		};

		const result = attachGitHubData(projects, githubData);
		expect(result[0].title).toBe('G');
		expect(result[0].repo).toBe('owner/g');
		expect(result[0].description).toBe('A description');
		expect(result[0].techLine).toBe('SvelteKit / TS');
		expect(result[0].liveUrl).toBe('https://example.com');
	});
});
