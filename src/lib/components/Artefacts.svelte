<script lang="ts">
	import type { Artefact } from '$lib/types';

	interface Props {
		artefacts: Artefact[];
	}

	let { artefacts }: Props = $props();
</script>

<section id="artefacts" class="mx-auto max-w-3xl px-6 py-32">
	<hr style="border-color: var(--border); margin-bottom: 3rem;" />

	<ul class="space-y-3" style="list-style: none; padding: 0;">
		{#each artefacts as artefact}
			<li class="reveal-section">
				<a
					href="https://github.com/JasonWarrenUK/{artefact.repo}"
					target="_blank"
					rel="noopener noreferrer"
					style="font-family: var(--font-mono); font-size: var(--text-sm);"
				>
					{artefact.name}
				</a>
				<span style="color: var(--text-tertiary); font-size: var(--text-sm);">
					— {artefact.description}
				</span>
			</li>
		{/each}
	</ul>
</section>
