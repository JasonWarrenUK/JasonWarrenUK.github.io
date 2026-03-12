import { describe, it, expect } from 'vitest';
import { parseCommitCount, isRepoResponse, isLanguagesResponse } from './github';

describe('parseCommitCount', () => {
	it('extracts count from a valid Link header', () => {
		const link = '<https://api.github.com/repos/foo/bar/commits?per_page=1&page=42>; rel="last"';
		expect(parseCommitCount(link, true)).toBe(42);
	});

	it('returns 1 when no Link header and response ok', () => {
		expect(parseCommitCount(null, true)).toBe(1);
	});

	it('returns 0 when no Link header and response not ok', () => {
		expect(parseCommitCount(null, false)).toBe(0);
	});

	it('returns 1 when Link header has no last page', () => {
		const link = '<https://api.github.com/repos/foo/bar/commits?per_page=1&page=2>; rel="next"';
		expect(parseCommitCount(link, true)).toBe(1);
	});

	it('handles multi-digit page numbers', () => {
		const link = '<https://api.github.com/repos/foo/bar/commits?per_page=1&page=1337>; rel="last"';
		expect(parseCommitCount(link, true)).toBe(1337);
	});
});

describe('isRepoResponse', () => {
	it('accepts a valid repo response', () => {
		expect(
			isRepoResponse({
				stargazers_count: 5,
				open_issues_count: 2,
				updated_at: '2024-01-01T00:00:00Z',
				language: 'TypeScript'
			})
		).toBe(true);
	});

	it('rejects null', () => {
		expect(isRepoResponse(null)).toBe(false);
	});

	it('rejects missing fields', () => {
		expect(isRepoResponse({ stargazers_count: 5 })).toBe(false);
	});

	it('rejects wrong types', () => {
		expect(
			isRepoResponse({
				stargazers_count: '5',
				open_issues_count: 2,
				updated_at: '2024-01-01T00:00:00Z',
				language: null
			})
		).toBe(false);
	});
});

describe('isLanguagesResponse', () => {
	it('accepts a valid languages object', () => {
		expect(isLanguagesResponse({ TypeScript: 5000, JavaScript: 2000 })).toBe(true);
	});

	it('accepts an empty object', () => {
		expect(isLanguagesResponse({})).toBe(true);
	});

	it('rejects an array', () => {
		expect(isLanguagesResponse([1, 2, 3])).toBe(false);
	});

	it('rejects null', () => {
		expect(isLanguagesResponse(null)).toBe(false);
	});

	it('rejects objects with non-number values', () => {
		expect(isLanguagesResponse({ TypeScript: '5000' })).toBe(false);
	});
});
