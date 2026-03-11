<script lang="ts">
	import type { SectionAccent } from '$lib/types';

	interface Props {
		id: string;
		title: string;
		accent?: SectionAccent;
		children: import('svelte').Snippet;
	}

	let { id, title, accent = 'none', children }: Props = $props();

	const accentColors: Record<SectionAccent, string> = {
		primary: 'var(--accent-primary)',
		warm: 'var(--accent-warm)',
		secondary: 'var(--accent-secondary)',
		none: 'transparent'
	};
</script>

<section {id} class="mx-auto max-w-3xl px-6 py-32">
	<h2
		class="section-heading"
		style="margin-bottom: 3rem; padding-left: {accent !== 'none' ? '1rem' : '0'}; border-left: {accent !== 'none' ? `3px solid ${accentColors[accent]}` : 'none'};"
	>
		{title}
	</h2>

	{@render children()}
</section>
