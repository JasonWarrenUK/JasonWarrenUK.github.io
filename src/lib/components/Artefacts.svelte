<script lang="ts">
	import type { Artefact } from '$lib/types';

	interface Props {
		artefacts: Artefact[];
	}

	let { artefacts }: Props = $props();
</script>

<section id="artefacts" class="artefacts-section mx-auto max-w-3xl px-6 py-32">
	<h2 class="artefacts-heading">
		Artefacts
	</h2>

	<p class="artefacts-intro">
		Smaller things. Side projects, experiments, and curios.
	</p>

	<ul class="artefacts-list space-y-3">
		{#each artefacts as artefact}
			<li class="reveal-section">
				<a
					href="https://github.com/{artefact.repo}"
					target="_blank"
					rel="noopener noreferrer"
					class="artefact-link"
				>
					{artefact.name}
				</a>
				<span class="artefact-desc">
					: {artefact.description}
				</span>
			</li>
		{/each}
	</ul>
</section>

<style>
	.artefacts-section {
		font-family: var(--font-mono);
	}

	.artefacts-heading {
		font-family: var(--font-mono);
		font-size: var(--text-2xl);
		color: var(--text-primary);
		margin-bottom: 2rem;
	}

	.artefacts-intro {
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
		font-size: var(--text-sm);
	}

	.artefacts-list {
		list-style: none;
		padding: 0;
	}

	.artefact-link {
		font-size: var(--text-sm);
	}

	.artefact-desc {
		color: var(--text-tertiary);
		font-size: var(--text-sm);
	}
</style>
