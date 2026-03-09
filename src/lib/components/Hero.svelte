<script lang="ts">
</script>

<section id="top" class="flex min-h-screen flex-col items-center justify-center px-6">
	<h1 class="hero-name" style="font-family: var(--font-display); font-size: var(--text-hero); font-weight: 700; line-height: 1.1;">
		Jason Warren
	</h1>
	<p
		class="mt-6 max-w-lg text-center"
		style="font-family: var(--font-body); font-size: var(--text-lg); color: var(--text-secondary); line-height: 1.6;"
	>
		Knowledge systems. Good software. For people who never get either.
	</p>
</section>

<style>
	.hero-name {
		background: linear-gradient(
			135deg,
			#5b8a9a,
			#8b4566,
			#c4756a,
			#5b8a9a
		);
		background-size: 300% 300%;
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: iris-cycle 30s ease infinite;
	}

	@keyframes iris-cycle {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-name {
			animation: none;
			background-position: 0% 50%;
		}
	}
</style>
