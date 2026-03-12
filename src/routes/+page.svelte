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

	interface Props {
		data: import('./$types').PageData;
	}

	let { data }: Props = $props();

	function attachGithubData(projects: Omit<Project, 'github'>[]): Project[] {
		return projects.map((p) => ({
			...p,
			github: data.githubData?.[p.repo] ?? null
		}));
	}

	const sectionTints: Record<string, string> = {
		top: '#0f0e0d',
		about: '#0f0e0d',
		impact: '#06232e',
		explorations: '#2e1208',
		meta: '#2a0820',
		background: '#0f0e0d',
		artefacts: '#161410',
		contact: '#0f0e0d'
	};

	$effect(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		const elements = document.querySelectorAll('.reveal-section');
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

	$effect(() => {
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
			{
				rootMargin: '-50% 0px -50% 0px',
				threshold: 0
			}
		);

		const sections = document.querySelectorAll('section[id]');
		sections.forEach((section) => tintObserver.observe(section));
		return () => tintObserver.disconnect();
	});
</script>

<svelte:head>
	<title>Jason Warren | Developer</title>
	<meta name="description" content="Knowledge systems. Good software. For people who never get either." />
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Person",
		"name": "Jason Warren",
		"url": "https://jasonwarrenuk.github.io",
		"sameAs": ["https://github.com/JasonWarrenUK"],
		"jobTitle": "Developer",
		"knowsAbout": ["Knowledge Systems", "SvelteKit", "TypeScript", "Civic Technology"]
	})}</script>`}
</svelte:head>

<Hero />

<About />

<Section id="impact" title="Impact Work" accent="primary">
	{#each attachGithubData(impactProjects) as project}
		{#if project.repo === 'foundersandcoders/iris'}
			<ProjectCard {project} accent="primary">
				<Terminal frames={irisSession} title="iris validate" />
			</ProjectCard>
		{:else}
			<ProjectCard {project} accent="primary" />
		{/if}
	{/each}
</Section>

<Section id="explorations" title="Explorations" accent="warm">
	<p class="pull-quote mb-12" style="border-left: 2px solid var(--accent-warm);">
		Projects that explore ideas through systems design. Each one takes a domain (history,
		philosophy, narrative, poetry) and builds a system that lets users engage with it on its
		own terms.
	</p>
	{#each attachGithubData(explorationProjects) as project}
		<ProjectCard {project} accent="warm" />
	{/each}
</Section>

<Section id="meta" title="Meta" accent="secondary">
	<p class="pull-quote mb-12" style="border-left: 2px solid var(--accent-secondary);">
		How I think about tooling and workflow. Most developers use tools. Some configure them. This is
		what happens when you encode your entire development methodology into a system.
	</p>
	{#each attachGithubData(metaProjects) as project}
		<ProjectCard {project} accent="secondary" />
	{/each}

</Section>

<Artefacts {artefacts} />

<Background />

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
