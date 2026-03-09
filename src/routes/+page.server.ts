import type { PageServerLoad } from './$types';
import type { ProjectGitHubData } from '$lib/types';
import { fetchAllRepoData } from '$lib/utils/github';
import { impactProjects, explorationProjects, metaProjects } from '$lib/data/projects';

export const load: PageServerLoad = async () => {
	const allRepos = [
		...impactProjects.map((p) => p.repo),
		...explorationProjects.map((p) => p.repo),
		...metaProjects.map((p) => p.repo)
	].filter((repo) => repo.length > 0);

	let githubData: Record<string, ProjectGitHubData | null> = {};

	try {
		githubData = await fetchAllRepoData(allRepos);
	} catch {
		// Graceful degradation; static content still works
	}

	return { githubData };
};
