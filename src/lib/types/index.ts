export interface ProjectGitHubData {
	languages: Record<string, number>;
	commitCount: number;
	lastUpdated: string;
	contributors: number;
	stars: number;
	openIssues: number;
}

export interface Project {
	title: string;
	repo: string;
	description: string;
	techLine: string;
	liveUrl?: string;
	github: ProjectGitHubData | null;
}

export interface Artefact {
	name: string;
	repo: string;
	description: string;
}

export interface TerminalFrame {
	text: string;
	delay: number;
}

export type SectionAccent = 'primary' | 'warm' | 'secondary' | 'none';

export const accentColors: Record<SectionAccent, string> = {
	primary: 'var(--accent-primary)',
	warm: 'var(--accent-warm)',
	secondary: 'var(--accent-secondary)',
	none: 'var(--border)'
};
