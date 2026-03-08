import type { Project } from '$lib/types';

export const impactProjects: Omit<Project, 'github'>[] = [
	{
		title: 'Things We Do',
		repo: 'fac-things-we-do',
		description:
			'A PWA for task management and emotional wellbeing, built for users with Tourette\'s syndrome. Mood tracking through interactive 3D visualisation. Offline-first architecture with RxDB so it works regardless of connectivity — because the people who need it most aren\'t always in places with reliable internet. 990 commits across multiple contributors, sustained over months of collaborative development.',
		techLine: 'Next.js 15 / React 19 / TypeScript / RxDB / Tailwind / Plotly.js'
	},
	{
		title: 'Sparker',
		repo: 'sparker',
		description:
			'Observation tracking for facilitators working with students who have special educational needs. Records observations using flexible, user-defined fields and surfaces patterns through automatic correlation detection. The architectural decision that defines it: observations stored in Neo4j, where correlation queries become natural graph traversals rather than complex SQL joins. Relationships as the primary data structure, not an afterthought.',
		techLine: 'SvelteKit 2 / Svelte 5 / TypeScript / Neo4j'
	},
	{
		title: 'Rhea',
		repo: 'rhea',
		description:
			'AI-powered curriculum generation for peer-led learning cohorts. Uses Claude with optional web research to generate module specifications, complete multi-week course structures, and maintain them over time. Built for democratic education — the cascade pattern means AI-generated content comes with change tracking, confidence scoring, and provenance so human curriculum councils can triage what needs review. Hierarchical domain configuration with inheritance and override. 350 commits.',
		techLine: 'SvelteKit / TypeScript / LangChain / Claude API / Zod'
	},
	{
		title: 'Iris',
		repo: 'iris',
		description:
			'ILR toolkit for apprenticeship data submission. Converts learner data from CSV exports into ILR-compliant XML for government submission, with explicit validation and cross-submission consistency checking. Ships via three interfaces: a full-screen interactive TUI, direct CLI commands, and a Tauri desktop app — all sharing a single TypeScript core. ADR-documented architectural decisions. 656 commits. Proper release cycle at v5.0.0.',
		techLine: 'TypeScript / SvelteKit / Tauri / Rust / @opentui/core / Vitest'
	},
	{
		title: 'Commons Traybake',
		repo: 'commons-traybake',
		description:
			'Civic technology for interrogating UK parliamentary data. Applies four different document chunking strategies to Hansard debates, embeds them in a Neo4j vector database, and lets users run comparative searches to see how processing decisions change which political information gets retrieved. The finding: strategies show only 8–25% overlap, proving that "neutral" data architecture encodes ideological choices.',
		techLine: 'SvelteKit / TypeScript / Neo4j / OpenAI embeddings / UK Parliament API / Docker'
	},
	{
		title: 'ReDoT',
		repo: 'redot',
		description:
			'A GitHub Action that auto-generates and updates code documentation using AI when pull requests are opened. Analyses which functions were actually modified, determines if documentation updates are needed, and creates or updates JSDoc comments and central documentation. Published with 9 releases. Three-person collaborative project.',
		techLine: 'TypeScript / GitHub Actions / Claude API'
	}
];

export const explorationProjects: Omit<Project, 'github'>[] = [
	{
		title: 'The Work',
		repo: 'the-work',
		description:
			'A narrative game about writing a PhD thesis in one night while staving off existential angst. Built with a custom Ink/Svelte runtime engine (Nib) that\'s extractable for reuse. 67 observations across 7 intellectual domains, an orthodoxy scoring system, 21 emergent disciplines from domain pairings, and a thesis defence that adapts to what you\'ve written. The game\'s idea progression — Observation, Inkling, Idea, Concept, Argument, Thesis — is itself a knowledge system.',
		techLine: 'SvelteKit / TypeScript / Ink (via inkjs) / Svelte 5 runes'
	},
	{
		title: 'Epoch',
		repo: 'epoch',
		description:
			'Create a fictional character, give them a lifetime, and discover what historical events they would have lived through. Transforms abstract history into personal narrative. Wikipedia API integration with significance ranking through Wikidata sitelinks, entity-type detection, named-event prefixes, and link density. Content filtering that strips sports results and malformed markup.',
		techLine: 'SvelteKit 2 / Svelte 5 / Tailwind 4 / DaisyUI 5 / Wikipedia + Wikidata APIs',
		liveUrl: 'https://epoch-tau.vercel.app'
	},
	{
		title: 'Flyt',
		repo: 'flyt',
		description:
			'A Norse contest of words — defend your honour through flyting, the ancient art of ritualised insult poetry. Interactive fiction built with DendryNexus and Svelte 5. Different narrative engine to The Work (DendryNexus vs Ink), same Svelte wrapper pattern. Custom .dry story file compilation pipeline.',
		techLine: 'SvelteKit / TypeScript / DendryNexus / Svelte 5',
		liveUrl: 'https://flyt-delta.vercel.app'
	},
	{
		title: 'Those Who Came Before',
		repo: 'those-who-came-before',
		description:
			'Try to understand a vanished culture by interpreting procedurally generated artefacts. Procedural archaeology with dual objective/subjective world states. Diegetic contradiction resolution. The player\'s interpretation is the gameplay. 84 commits with structured backlog and dev documentation.',
		techLine: 'SvelteKit / Svelte 5 / TypeScript'
	}
];

export const metaProjects: Omit<Project, 'github'>[] = [
	{
		title: 'Goblin Mode',
		repo: 'goblin-mode',
		description:
			'"Three goblins in a trenchcoat pretending to be a senior developer." A Claude Code configuration framework — 50+ slash commands, 12 passive skills, 3 autonomous agents, git hooks — built around ADHD-aware friction design and context window discipline. Weakness-aware design: testing is a known weakness, so a dedicated skill encodes the discipline; ADHD makes executive function unreliable, so hooks enforce it. Model tier thinking maps Haiku/Sonnet/Opus to task complexity. The process of building it is the transferable skill, not the specifics.',
		techLine: 'Shell / Claude Code / CLAUDE.md'
	},
	{
		title: 'Nib Engine',
		repo: 'the-work',
		description:
			'A generic Ink + Svelte 5 runtime engine extracted from The Work. Handles story loading, reactive state via Svelte 5 runes, tag processing, and save/load — with zero knowledge of any particular game\'s mechanics. Game-specific logic is injected through a single onInit callback. Copy src/lib/engine/ to any SvelteKit project and it works. The ability to identify a reusable abstraction inside a bespoke project and extract it cleanly.',
		techLine: 'SvelteKit / TypeScript / Ink (via inkjs) / Svelte 5 runes'
	}
];
