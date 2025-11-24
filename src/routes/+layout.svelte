<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { store } from '$lib/store.svelte';

	let { children } = $props();
	let theme = $state('cyberpunk');

	$effect(() => {
		store.listRabbits();
		$inspect('🐰: ', store.rabbits);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div data-theme={theme}>
	<nav class="flex items-center justify-between p-2">
		<a href="/" class=" cursor-pointer text-4xl">🐰</a>
		<select class="select w-[150px]" bind:value={theme}>
			<option disabled selected>Pick a theme</option>
			<option value="light">light</option>
			<option value="dark">dark</option>
			<option value="cyberpunk">cyberpunk</option>
			<option value="valentine">valentine</option>
			<option value="halloween">halloween</option>
		</select>
	</nav>
	<main class="flex min-h-screen flex-col items-center gap-4 p-2">
		{@render children?.()}
	</main>
</div>
