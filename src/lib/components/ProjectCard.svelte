<script lang="ts">
	import type { Project, SectionAccent } from '$lib/types';
	import type { Snippet } from 'svelte';

	interface Props {
		project: Project;
		accent?: SectionAccent;
		children?: Snippet;
	}

	let { project, accent = 'primary', children }: Props = $props();

	const accentColors: Record<SectionAccent, string> = {
		primary: 'var(--accent-primary)',
		warm: 'var(--accent-warm)',
		secondary: 'var(--accent-secondary)',
		none: 'var(--border)'
	};

	function formatLanguages(languages: Record<string, number>): string {
		const total = Object.values(languages).reduce((a, b) => a + b, 0);
		if (total === 0) return '';
		return Object.entries(languages)
			.sort(([, a], [, b]) => b - a)
			.slice(0, 4)
			.map(([lang, bytes]) => `${lang} ${Math.round((bytes / total) * 100)}%`)
			.join(' · ');
	}

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString('en-GB', {
			month: 'short',
			year: 'numeric'
		});
	}
</script>

<article
	class="reveal-section mb-12"
	style="padding-left: 1.5rem; border-left: 2px solid {accentColors[accent]};"
>
	<h3
		style="font-family: var(--font-display); font-size: var(--text-xl); color: var(--text-primary); margin-bottom: 0.75rem;"
	>
		{project.title}
	</h3>

	<p style="color: var(--text-primary); line-height: 1.8; margin-bottom: 1rem;">
		{project.description}
	</p>

	<p style="font-size: var(--text-sm); color: var(--text-tertiary); font-family: var(--font-mono); margin-bottom: 0.75rem;">
		{project.techLine}
	</p>

	{#if project.github}
		{#if project.github.stars > 0}
			<div class="flex flex-wrap gap-4" style="font-size: var(--text-xs); color: var(--text-tertiary);">
				<span>{project.github.stars} stars</span>
			</div>
		{/if}

		{#if Object.keys(project.github.languages).length > 0}
			<p style="font-size: var(--text-xs); color: var(--text-tertiary); margin-top: 0.5rem;">
				{formatLanguages(project.github.languages)}
			</p>
		{/if}
	{/if}

	<div class="mt-3 flex gap-4" style="font-size: var(--text-sm);">
		<a
			href="https://github.com/JasonWarrenUK/{project.repo}"
			target="_blank"
			rel="noopener noreferrer"
		>
			Repository
		</a>
		{#if project.liveUrl}
			<a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
				Live
			</a>
		{/if}
	</div>

	{#if children}
		<div class="mt-6">
			{@render children()}
		</div>
	{/if}
</article>
