<script lang="ts">
	import type { TerminalFrame } from '$lib/types';
	import { onMount } from 'svelte';

	interface Props {
		frames: TerminalFrame[];
		title?: string;
	}

	let { frames, title = 'terminal' }: Props = $props();

	let visibleLines = $state<string[]>([]);
	let showCursor = $state(true);
	let hasPlayed = $state(false);
	let containerEl: HTMLElement | undefined = $state();

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			visibleLines = frames.map((f) => f.text);
			showCursor = false;
			hasPlayed = true;
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !hasPlayed) {
					hasPlayed = true;
					playFrames();
					observer.disconnect();
				}
			},
			{ threshold: 0.3 }
		);

		if (containerEl) observer.observe(containerEl);

		return () => observer.disconnect();
	});

	async function playFrames() {
		for (const frame of frames) {
			if (frame.delay > 0) {
				await new Promise((r) => setTimeout(r, frame.delay));
			}
			visibleLines = [...visibleLines, frame.text];
		}
		showCursor = false;
	}
</script>

<div
	bind:this={containerEl}
	role="img"
	aria-label="Terminal demonstration showing {title}"
	class="terminal-window reveal-section overflow-hidden rounded-lg"
>
	<!-- Title bar -->
	<div class="terminal-titlebar flex items-center gap-2 px-4 py-2">
		<span class="terminal-dot inline-block h-3 w-3 rounded-full" style="background-color: #ef4444;"></span>
		<span class="terminal-dot inline-block h-3 w-3 rounded-full" style="background-color: #f59e0b;"></span>
		<span class="terminal-dot inline-block h-3 w-3 rounded-full" style="background-color: #22c55e;"></span>
		<span class="terminal-title ml-2">
			{title}
		</span>
	</div>

	<!-- Terminal content -->
	<pre
		class="terminal-content overflow-x-auto p-4"
	>{#each visibleLines as line}{line}
{/each}{#if showCursor}<span class="cursor">█</span>{/if}</pre>
</div>

<style>
	.terminal-window {
		background-color: var(--terminal-bg);
		border: 1px solid var(--border);
	}

	.terminal-titlebar {
		background-color: var(--bg-tertiary);
		border-bottom: 1px solid var(--border);
	}

	.terminal-title {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--accent-primary);
	}

	.terminal-content {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--terminal-text);
		line-height: 1.6;
		margin: 0;
	}

	.cursor {
		animation: blink 1s step-end infinite;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	@media (prefers-reduced-motion: reduce) {
		.cursor {
			animation: none;
		}
	}
</style>
