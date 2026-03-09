<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Section from '$lib/components/Section.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Artefacts from '$lib/components/Artefacts.svelte';
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

	onMount(() => {
		if (!browser) return;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		const elements = document.querySelectorAll('.reveal-section');

		// Mark elements as JS-ready so CSS can hide them for the reveal
		elements.forEach((el) => el.classList.add('reveal-ready'));

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add('revealed');
						observer.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.1 }
		);

		elements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Jason Warren — Developer</title>
	<meta name="description" content="Building tools that take seriously the people they touch." />
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
	<p class="mb-12" style="color: var(--text-secondary); line-height: 1.8;">
		Projects that explore ideas through systems design. Each one takes a domain — history,
		philosophy, narrative, poetry — and builds a system that lets users engage with it on its
		own terms.
	</p>
	{#each withGithub(explorationProjects) as project}
		<ProjectCard {project} accent="warm" />
	{/each}
</Section>

<Section id="meta" title="Meta" accent="secondary">
	<p class="mb-12" style="color: var(--text-secondary); line-height: 1.8;">
		How I think about tooling and workflow. Most developers use tools. Some configure them. This is
		what happens when you encode your entire development methodology into a system.
	</p>
	{#each withGithub(metaProjects) as project}
		<ProjectCard {project} accent="secondary" />
	{/each}

</Section>

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
