import type { ProjectGitHubData } from '$lib/types';

const GITHUB_USER = 'JasonWarrenUK';
const API_BASE = 'https://api.github.com';

async function fetchJson<T>(url: string): Promise<T | null> {
	try {
		const res = await fetch(url, {
			headers: { Accept: 'application/vnd.github.v3+json' }
		});
		if (!res.ok) return null;
		return (await res.json()) as T;
	} catch {
		return null;
	}
}

interface RepoResponse {
	stargazers_count: number;
	open_issues_count: number;
	updated_at: string;
	language: string | null;
}

interface ContributorResponse {
	login: string;
}

export async function fetchRepoData(repoName: string): Promise<ProjectGitHubData | null> {
	const repoUrl = `${API_BASE}/repos/${GITHUB_USER}/${repoName}`;

	const [repo, languages, contributors] = await Promise.all([
		fetchJson<RepoResponse>(repoUrl),
		fetchJson<Record<string, number>>(`${repoUrl}/languages`),
		fetchJson<ContributorResponse[]>(`${repoUrl}/contributors?per_page=100`)
	]);

	if (!repo) return null;

	// Get commit count from the default branch
	let commitCount = 0;
	try {
		const commitsRes = await fetch(`${repoUrl}/commits?per_page=1`, {
			headers: { Accept: 'application/vnd.github.v3+json' }
		});
		const linkHeader = commitsRes.headers.get('Link');
		if (linkHeader) {
			const match = linkHeader.match(/page=(\d+)>; rel="last"/);
			if (match) commitCount = parseInt(match[1], 10);
		} else if (commitsRes.ok) {
			commitCount = 1;
		}
	} catch {
		// graceful degradation
	}

	return {
		languages: languages ?? {},
		commitCount,
		lastUpdated: repo.updated_at,
		contributors: Array.isArray(contributors) ? contributors.length : 0,
		stars: repo.stargazers_count,
		openIssues: repo.open_issues_count
	};
}

export async function fetchAllRepoData(
	repoNames: string[]
): Promise<Record<string, ProjectGitHubData | null>> {
	const unique = [...new Set(repoNames)];
	const results = await Promise.all(unique.map((name) => fetchRepoData(name)));

	const data: Record<string, ProjectGitHubData | null> = {};
	unique.forEach((name, i) => {
		data[name] = results[i];
	});
	return data;
}
