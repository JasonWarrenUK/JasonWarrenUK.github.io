<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Section from '$lib/components/Section.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Artefacts from '$lib/components/Artefacts.svelte';
	import Background from '$lib/components/Background.svelte';
	import Contact from '$lib/components/Contact.svelte';

	import { impactProjects, explorationProjects, metaProjects } from '$lib/data/projects';
	import { artefacts } from '$lib/data/artefacts';
	import { irisSession } from '$lib/data/terminal';
	import type { Project } from '$lib/types';

	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	interface Props {
		data: import('./$types').PageData;
	}

	let { data }: Props = $props();

	function withGithub(projects: Omit<Project, 'github'>[]): Project[] {
		return projects.map((p) => ({
			...p,
			github: data.githubData?.[p.repo] ?? null
		}));
	}

	const sectionTints: Record<string, string> = {
		top: '#0f0e0d',
		about: '#0f0e0d',
		impact: '#0d1a1f',
		explorations: '#1a140f',
		meta: '#1a0f16',
		background: '#0f0e0d',
		artefacts: '#0f0e0d',
		contact: '#0f0e0d'
	};

	onMount(() => {
		if (!browser) return;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		const elements = document.querySelectorAll('.reveal-section');

		// Mark elements as JS-ready so CSS can hide them for the reveal
		elements.forEach((el) => el.classList.add('reveal-ready'));

		const revealObserver = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add('revealed');
						revealObserver.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.1 }
		);

		elements.forEach((el) => revealObserver.observe(el));

		// Scroll-driven background colour transitions
		document.body.style.transition = 'background-color 600ms ease';

		const tintObserver = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const id = entry.target.id;
						if (id && sectionTints[id]) {
							document.body.style.backgroundColor = sectionTints[id];
						}
					}
				}
			},
			{ threshold: 0.3 }
		);

		const sections = document.querySelectorAll('section[id]');
		sections.forEach((section) => tintObserver.observe(section));

		return () => {
			revealObserver.disconnect();
			tintObserver.disconnect();
		};
	});
</script>

<svelte:head>
	<title>Jason Warren | Developer</title>
	<meta name="description" content="Knowledge systems. Good software. For people who never get either." />
</svelte:head>

<Hero />

<About />

<Section id="impact" title="Impact Work" accent="primary">
	{#each withGithub(impactProjects) as project}
		{#if project.repo === 'iris'}
			<ProjectCard {project} accent="primary">
				<Terminal frames={irisSession} title="iris validate" />
			</ProjectCard>
		{:else}
			<ProjectCard {project} accent="primary" />
		{/if}
	{/each}
</Section>

<Section id="explorations" title="Explorations" accent="warm">
	<p class="pull-quote mb-12" style="color: var(--text-secondary); font-family: var(--font-display); font-size: var(--text-lg); font-style: italic; line-height: 1.8; padding-left: 1.5rem; border-left: 2px solid var(--accent-warm);">
		Projects that explore ideas through systems design. Each one takes a domain (history,
		philosophy, narrative, poetry) and builds a system that lets users engage with it on its
		own terms.
	</p>
	{#each withGithub(explorationProjects) as project}
		<ProjectCard {project} accent="warm" />
	{/each}
</Section>

<Section id="meta" title="Meta" accent="secondary">
	<p class="pull-quote mb-12" style="color: var(--text-secondary); font-family: var(--font-display); font-size: var(--text-lg); font-style: italic; line-height: 1.8; padding-left: 1.5rem; border-left: 2px solid var(--accent-secondary);">
		How I think about tooling and workflow. Most developers use tools. Some configure them. This is
		what happens when you encode your entire development methodology into a system.
	</p>
	{#each withGithub(metaProjects) as project}
		<ProjectCard {project} accent="secondary" />
	{/each}

</Section>

<Background />

<Artefacts {artefacts} />

<Contact />

<style>
	:global(.reveal-section.reveal-ready) {
		opacity: 0;
		transform: translateY(8px);
		transition: opacity 600ms ease-out, transform 600ms ease-out;
	}

	:global(.reveal-section.revealed) {
		opacity: 1;
		transform: translateY(0);
	}
</style>
