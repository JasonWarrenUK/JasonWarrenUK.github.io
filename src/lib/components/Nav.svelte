<script lang="ts">
	const sections = [
		{ id: 'about', label: 'About' },
		{ id: 'impact', label: 'Impact' },
		{ id: 'explorations', label: 'Explorations' },
		{ id: 'meta', label: 'Meta' },
		{ id: 'artefacts', label: 'Artefacts' },
		{ id: 'contact', label: 'Contact' }
	];

	let menuOpen = $state(false);
</script>

<nav
	class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
	style="background-color: color-mix(in srgb, var(--bg-primary) 80%, transparent); border-bottom: 1px solid var(--border); transition: background-color 600ms ease;"
>
	<div class="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
		<a
			href="#top"
			class="no-underline"
			style="font-family: var(--font-display); font-size: var(--text-lg); color: var(--text-primary);"
		>
			Jason Warren
		</a>

		<div class="flex items-center gap-6">
			<div class="hidden items-center gap-5 md:flex">
				{#each sections as section}
					<a
						href="#{section.id}"
						class="no-underline transition-colors duration-300"
						style="font-family: var(--font-body); font-size: var(--text-sm); color: var(--text-secondary);"
						onmouseenter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
						onmouseleave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
					>
						{section.label}
					</a>
				{/each}
			</div>

			<button
				type="button"
				class="md:hidden"
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={menuOpen}
				onclick={() => menuOpen = !menuOpen}
				style="color: var(--text-secondary); background: none; border: none; cursor: pointer; padding: 0.25rem;"
			>
				<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					{#if menuOpen}
						<path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
					{:else}
						<path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" />
					{/if}
				</svg>
			</button>

			<a
				href="https://github.com/JasonWarrenUK"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="GitHub profile"
				style="color: var(--text-secondary);"
				class="transition-colors duration-300 hover:!text-[var(--text-primary)]"
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path
						d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
					/>
				</svg>
			</a>
		</div>
	</div>

	{#if menuOpen}
		<div
			class="md:hidden"
			style="border-top: 1px solid var(--border); background-color: color-mix(in srgb, var(--bg-primary) 95%, transparent);"
		>
			<div class="mx-auto flex max-w-3xl flex-col gap-1 px-6 py-3">
				{#each sections as section}
					<a
						href="#{section.id}"
						class="no-underline transition-colors duration-300"
						style="font-family: var(--font-body); font-size: var(--text-sm); color: var(--text-secondary); padding: 0.375rem 0;"
						onclick={() => menuOpen = false}
						onmouseenter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
						onmouseleave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
					>
						{section.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</nav>
