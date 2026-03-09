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

	function splitOverview(desc: string): { overview: string; detail: string } {
		// Match '. ' or '." ' as sentence boundaries
		const match = desc.match(/\.\s|\."\s/);
		if (!match || match.index === undefined) return { overview: desc, detail: '' };
		const end = match.index + match[0].length;
		return { overview: desc.slice(0, end).trimEnd(), detail: desc.slice(end) };
	}

	const { overview, detail } = $derived(splitOverview(project.description));

	let expanded = $state(false);
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

	<p style="color: var(--text-primary); font-size: var(--text-base); line-height: 1.6; margin-bottom: 0.5rem; font-weight: 500;">
		{overview}
	</p>

	{#if detail || children}
		<button
			type="button"
			onclick={() => expanded = !expanded}
			style="color: {accentColors[accent]}; font-size: var(--text-sm); font-family: var(--font-mono); background: none; border: none; cursor: pointer; padding: 0; margin-bottom: 0.5rem;"
		>
			{expanded ? '▾ Less' : '▸ More'}
		</button>

		{#if expanded}
			{#if detail}
				<p class="card-detail" style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1rem;">
					{detail}
				</p>
			{/if}
			{#if children}
				<div class="mt-6">
					{@render children()}
				</div>
			{/if}
		{/if}
	{/if}

	<p style="font-size: var(--text-sm); color: {accentColors[accent]}; font-family: var(--font-mono); margin-bottom: 0.75rem;">
		{project.techLine}
	</p>

	{#if project.github}
		{#if Object.keys(project.github.languages).length > 0}
			<p style="font-size: var(--text-xs); color: {accentColors[accent]}; margin-top: 0.5rem;">
				{formatLanguages(project.github.languages)}
			</p>
		{/if}
	{/if}

	{#if project.repo}
		<div class="mt-3 flex gap-4" style="font-size: var(--text-sm);">
			<a
				href="https://github.com/{project.repo}"
				target="_blank"
				rel="noopener noreferrer"
				class="transition-colors duration-300"
				style="color: var(--text-secondary);"
				onmouseenter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
				onmouseleave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
			>
				Repository
			</a>
			{#if project.liveUrl}
				<a
					href={project.liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="transition-colors duration-300"
					style="color: var(--text-secondary);"
					onmouseenter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
					onmouseleave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
				>
					Live
				</a>
			{/if}
		</div>
	{/if}
</article>

<style>
	.card-detail {
		animation: card-expand 200ms ease-out;
	}

	@keyframes card-expand {
		from {
			opacity: 0;
			max-height: 0;
		}
		to {
			opacity: 1;
			max-height: 20rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.card-detail {
			animation: none;
		}
	}
</style>
