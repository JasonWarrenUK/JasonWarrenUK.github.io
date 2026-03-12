import type { PageServerLoad } from './$types';
import type { Project, ProjectGitHubData } from '$lib/types';
import { fetchAllRepoData } from '$lib/utils/github';
import { impactProjects, explorationProjects, metaProjects } from '$lib/data/projects';

function attachGithubData(
	projects: Omit<Project, 'github'>[],
	githubData: Record<string, ProjectGitHubData | null>
): Project[] {
	return projects.map((p) => ({
		...p,
		github: githubData[p.repo] ?? null
	}));
}

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
