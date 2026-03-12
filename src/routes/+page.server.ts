import type { PageServerLoad } from './$types';
import { fetchAllRepoData, attachGithubData } from '$lib/utils/github';
import { impactProjects, explorationProjects, metaProjects } from '$lib/data/projects';

export const load: PageServerLoad = async () => {
	const allRepos = [
		...impactProjects.map((p) => p.repo),
		...explorationProjects.map((p) => p.repo),
		...metaProjects.map((p) => p.repo)
	];

	const githubData = await fetchAllRepoData(allRepos);

	return {
		impactProjects: attachGithubData(impactProjects, githubData),
		explorationProjects: attachGithubData(explorationProjects, githubData),
		metaProjects: attachGithubData(metaProjects, githubData)
	};
};
