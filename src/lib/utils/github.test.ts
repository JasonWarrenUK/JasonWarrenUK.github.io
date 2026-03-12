import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { parseCommitCount, isRepoResponse, isLanguagesResponse, fetchRepoData, fetchAllRepoData } from './github';

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
				updated_at: '2024-01-01T00:00:00Z'
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
				updated_at: '2024-01-01T00:00:00Z'
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

const validRepo = {
	stargazers_count: 5,
	open_issues_count: 2,
	updated_at: '2024-01-01T00:00:00Z'
};

function jsonResponse(body: unknown, headers: Record<string, string> = {}): Response {
	return {
		ok: true,
		status: 200,
		json: () => Promise.resolve(body),
		headers: new Headers(headers)
	} as unknown as Response;
}

function errorResponse(status = 404): Response {
	return {
		ok: false,
		status,
		headers: new Headers()
	} as unknown as Response;
}

describe('fetchRepoData', () => {
	beforeEach(() => {
		vi.stubGlobal('fetch', vi.fn());
		vi.spyOn(console, 'warn').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('returns ProjectGitHubData on success', async () => {
		const mockFetch = vi.mocked(fetch);
		mockFetch.mockImplementation((url) => {
			const u = typeof url === 'string' ? url : url.toString();
			if (u.endsWith('/languages')) return Promise.resolve(jsonResponse({ TypeScript: 5000 }));
			if (u.includes('/contributors')) return Promise.resolve(jsonResponse([{ id: 1 }]));
			if (u.includes('/commits')) return Promise.resolve(jsonResponse([], { Link: '<url?page=10>; rel="last"' }));
			return Promise.resolve(jsonResponse(validRepo));
		});

		const result = await fetchRepoData('owner/repo');
		expect(result).toEqual({
			languages: { TypeScript: 5000 },
			commitCount: 10,
			lastUpdated: '2024-01-01T00:00:00Z',
			contributors: 1,
			stars: 5,
			openIssues: 2
		});
	});

	it('returns null when repo API returns non-ok', async () => {
		vi.mocked(fetch).mockResolvedValue(errorResponse(404));
		const result = await fetchRepoData('owner/repo');
		expect(result).toBeNull();
	});

	it('returns null on network error', async () => {
		vi.mocked(fetch).mockRejectedValue(new Error('Network error'));
		const result = await fetchRepoData('owner/repo');
		expect(result).toBeNull();
	});

	it('returns null when response is malformed', async () => {
		vi.mocked(fetch).mockResolvedValue(jsonResponse({ not: 'a repo' }));
		const result = await fetchRepoData('owner/repo');
		expect(result).toBeNull();
	});
});

describe('fetchAllRepoData', () => {
	beforeEach(() => {
		vi.stubGlobal('fetch', vi.fn());
		vi.spyOn(console, 'warn').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('deduplicates repo names', async () => {
		const mockFetch = vi.mocked(fetch);
		mockFetch.mockImplementation((url) => {
			const u = typeof url === 'string' ? url : url.toString();
			if (u.endsWith('/languages')) return Promise.resolve(jsonResponse({}));
			if (u.includes('/contributors')) return Promise.resolve(jsonResponse([]));
			if (u.includes('/commits')) return Promise.resolve(jsonResponse([]));
			return Promise.resolve(jsonResponse(validRepo));
		});

		const result = await fetchAllRepoData(['owner/repo', 'owner/repo']);
		expect(Object.keys(result)).toHaveLength(1);
		expect(result['owner/repo']).not.toBeNull();
	});

	it('handles partial failures', async () => {
		const mockFetch = vi.mocked(fetch);
		let callCount = 0;
		mockFetch.mockImplementation((url) => {
			const u = typeof url === 'string' ? url : url.toString();
			if (u.includes('bad-repo') && !u.includes('/languages') && !u.includes('/contributors') && !u.includes('/commits')) {
				return Promise.resolve(errorResponse(404));
			}
			if (u.endsWith('/languages')) return Promise.resolve(jsonResponse({}));
			if (u.includes('/contributors')) return Promise.resolve(jsonResponse([]));
			if (u.includes('/commits')) return Promise.resolve(jsonResponse([]));
			return Promise.resolve(jsonResponse(validRepo));
		});

		const result = await fetchAllRepoData(['owner/good-repo', 'owner/bad-repo']);
		expect(result['owner/good-repo']).not.toBeNull();
		expect(result['owner/bad-repo']).toBeNull();
	});
});
