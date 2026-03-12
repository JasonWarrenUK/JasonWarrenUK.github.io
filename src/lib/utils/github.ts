import type { ProjectGitHubData } from '$lib/types';

const API_BASE = 'https://api.github.com';
const GITHUB_HEADERS = { Accept: 'application/vnd.github.v3+json' };

async function fetchGitHub(url: string): Promise<Response | null> {
	try {
		const res = await fetch(url, { headers: GITHUB_HEADERS });
		if (!res.ok) {
			console.warn('[GitHub API] Non-ok response', { url, status: res.status });
			return null;
		}
		return res;
	} catch (e) {
		console.warn('[GitHub API] Fetch failed', { url, error: (e as Error).message });
		return null;
	}
}

async function tryFetchJson(url: string): Promise<unknown | null> {
	const res = await fetchGitHub(url);
	if (!res) return null;
	return res.json();
}

interface RepoResponse {
	stargazers_count: number;
	open_issues_count: number;
	updated_at: string;
}

// Exported for testing
export function isRepoResponse(data: unknown): data is RepoResponse {
	if (typeof data !== 'object' || data === null) return false;
	const obj = data as Record<string, unknown>;
	return (
		typeof obj.stargazers_count === 'number' &&
		typeof obj.open_issues_count === 'number' &&
		typeof obj.updated_at === 'string'
	);
}

// Exported for testing
export function isLanguagesResponse(data: unknown): data is Record<string, number> {
	if (typeof data !== 'object' || data === null || Array.isArray(data)) return false;
	return Object.values(data as Record<string, unknown>).every((v) => typeof v === 'number');
}

// Exported for testing
export function parseCommitCount(linkHeader: string | null, responseOk: boolean): number {
	if (linkHeader) {
		const match = linkHeader.match(/page=(\d+)>; rel="last"/);
		if (match) return parseInt(match[1], 10);
	}
	return responseOk ? 1 : 0;
}

export async function fetchRepoData(repoPath: string): Promise<ProjectGitHubData | null> {
	const repoUrl = `${API_BASE}/repos/${repoPath}`;

	const [repoRaw, langRaw, contribRaw, commitsRes] = await Promise.all([
		tryFetchJson(repoUrl),
		tryFetchJson(`${repoUrl}/languages`),
		tryFetchJson(`${repoUrl}/contributors?per_page=100`),
		fetchGitHub(`${repoUrl}/commits?per_page=1`)
	]);

	if (!isRepoResponse(repoRaw)) return null;
	const repo = repoRaw;
	const languages = isLanguagesResponse(langRaw) ? langRaw : {};
	const contributors = Array.isArray(contribRaw) ? contribRaw.length : 0;
	const commitCount = parseCommitCount(
		commitsRes?.headers.get('Link') ?? null,
		commitsRes !== null
	);

	return {
		languages,
		commitCount,
		lastUpdated: repo.updated_at,
		contributors,
		stars: repo.stargazers_count,
		openIssues: repo.open_issues_count
	};
}

export async function fetchAllRepoData(
	repoNames: string[]
): Promise<Record<string, ProjectGitHubData | null>> {
	const unique = [...new Set(repoNames)];
	const results = await Promise.all(unique.map((name) => fetchRepoData(name)));
	return Object.fromEntries(unique.map((name, i) => [name, results[i]]));
}
