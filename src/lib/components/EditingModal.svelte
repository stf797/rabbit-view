<script>
	import { store, pb } from '$lib/store.svelte';
	let { currentRabbitId = '' } = $props();

	let rabbit = $state({
		name: 'New Name',
		rabbitHole: ''
	});

	let rabbitholes = $state([]);

	let wrongRabbitName = $derived(rabbit.name && rabbit.name[0] !== 'J' && rabbit.name.length > 0);

	async function editRabbit() {
		await store.editRabbit(currentRabbitId, rabbit);
	}
	$effect(async () => {
		rabbitholes = await pb.collection('rabbitholes').getFullList();
		if (currentRabbitId) {
			rabbit = Object.assign(
				{},
				store.rabbits.find((rabbit) => rabbit.id === currentRabbitId)
			);
		}
	});
</script>

<div class="flex flex-col gap-2">
	<h3 class="text-lg font-bold">Edit rabbit with ID {currentRabbitId}</h3>
	<label class="input">
		<span class="label">Name</span>
		<input type="text" bind:value={rabbit.name} />
	</label>

	<div>
		<label class="select">
			<span class="label">Rabbithole</span>
			<select bind:value={rabbit.rabbithole}>
				{#each rabbitholes as rabbithole (rabbithole.id)}
					<option value={rabbithole.id}>{rabbithole.name}</option>
				{/each}
			</select>
		</label>
	</div>
	{#if wrongRabbitName}
		<div role="alert" class="alert alert-error">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 shrink-0 stroke-current"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<span>Watch out! Rabbit names must start with "J"!</span>
		</div>
	{/if}
	<div class="self-end">
		<!-- if there is a button in form, it will close the modal -->
		<button class="btn"><a href="/">Cancel</a></button>
		<button
			class="btn btn-primary"
			onclick={editRabbit}
			disabled={wrongRabbitName || rabbit.name === ''}>Change Name!</button
		>
	</div>
</div>
