import type { PageServerLoad } from './$types';
import { fetchAllRepoData, attachGitHubData } from '$lib/utils/github';
import { impactProjects, explorationProjects, metaProjects } from '$lib/data/projects';

export const load: PageServerLoad = async () => {
	const allRepos = [
		...impactProjects.map((p) => p.repo),
		...explorationProjects.map((p) => p.repo),
		...metaProjects.map((p) => p.repo)
	];

	let githubData;
	try {
		githubData = await fetchAllRepoData(allRepos);
	} catch (e) {
		const message = e instanceof Error ? e.message : String(e);
		console.warn('[SSG] GitHub data fetch failed, building without GitHub data', { error: message });
		githubData = {};
	}

	return {
		impactProjects: attachGitHubData(impactProjects, githubData),
		explorationProjects: attachGitHubData(explorationProjects, githubData),
		metaProjects: attachGitHubData(metaProjects, githubData)
	};
};
