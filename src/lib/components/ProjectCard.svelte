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

	const langColors: Record<string, string> = {
		TypeScript: 'var(--accent-primary)',
		JavaScript: 'var(--accent-warm)',
		Svelte: 'var(--accent-warm)',
		CSS: 'var(--accent-secondary)',
		HTML: 'var(--accent-secondary)',
		Rust: 'var(--accent-warm)',
		Shell: 'var(--accent-primary)',
		Python: 'var(--accent-primary)'
	};

	function getLanguageSegments(languages: Record<string, number>): { lang: string; pct: number; color: string }[] {
		const total = Object.values(languages).reduce((a, b) => a + b, 0);
		if (total === 0) return [];
		const palette = [
			'var(--accent-primary)',
			'var(--accent-warm)',
			'var(--accent-secondary)',
			'var(--text-tertiary)'
		];
		return Object.entries(languages)
			.sort(([, a], [, b]) => b - a)
			.slice(0, 4)
			.map(([lang, bytes], i) => ({
				lang,
				pct: Math.round((bytes / total) * 100),
				color: langColors[lang] ?? palette[i] ?? 'var(--text-tertiary)'
			}));
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
	class="card reveal-section mb-12"
	style="border-left: 2px solid {accentColors[accent]};"
>
	<h3 class="card-title">
		{project.title}
	</h3>

	<p class="card-overview">
		{overview}
	</p>

	{#if detail || children}
		<button
			type="button"
			class="card-toggle"
			onclick={() => expanded = !expanded}
			style="color: {accentColors[accent]};"
		>
			{expanded ? '▾ Less' : '▸ More'}
		</button>

		{#if expanded}
			{#if detail}
				<p class="card-detail card-detail-text">
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

	<p class="card-tech" style="color: {accentColors[accent]};">
		{project.techLine}
	</p>

	{#if project.github}
		{@const segments = getLanguageSegments(project.github.languages)}
		{#if segments.length > 0}
			<div class="lang-section">
				<div class="lang-bar">
					{#each segments as seg}
						<div style="width: {seg.pct}%; background: {seg.color};" title="{seg.lang} {seg.pct}%"></div>
					{/each}
				</div>
				<p class="lang-labels">
					{segments.map(s => `${s.lang} ${s.pct}%`).join(' · ')}
				</p>
			</div>
		{/if}
	{/if}

	{#if project.repo}
		<div class="card-links mt-3 flex gap-4">
			<a
				href="https://github.com/{project.repo}"
				target="_blank"
				rel="noopener noreferrer"
				class="transition-colors duration-300"
			>
				Repository
			</a>
			{#if project.liveUrl}
				<a
					href={project.liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="transition-colors duration-300"
				>
					Live
				</a>
			{/if}
		</div>
	{/if}
</article>

<style>
	.card {
		padding-left: 1.5rem;
	}

	.card-title {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		color: var(--text-primary);
		margin-bottom: 0.75rem;
	}

	.card-overview {
		color: var(--text-primary);
		font-size: var(--text-base);
		line-height: 1.6;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	.card-toggle {
		font-size: var(--text-sm);
		font-family: var(--font-mono);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		margin-bottom: 0.5rem;
	}

	.card-detail {
		animation: card-expand 200ms ease-out;
	}

	.card-detail-text {
		color: var(--text-secondary);
		line-height: 1.8;
		margin-bottom: 1rem;
	}

	.card-tech {
		font-size: var(--text-sm);
		font-family: var(--font-mono);
		margin-bottom: 0.75rem;
	}

	.lang-section {
		margin-top: 0.5rem;
	}

	.lang-bar {
		display: flex;
		height: 4px;
		border-radius: 2px;
		overflow: hidden;
		gap: 1px;
	}

	.lang-labels {
		font-size: var(--text-xs);
		color: var(--text-tertiary);
		margin-top: 0.25rem;
	}

	.card-links {
		font-size: var(--text-sm);
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
