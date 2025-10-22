<script>
	import RabbitForm from '$lib/components/RabbitForm.svelte';
	import { serverAddress, store } from '$lib/store.svelte.js';
	import Icon from '@iconify/svelte';

	let currentRabbitId = $state();
	let newName = $state('');

	async function editRabbit() {
		await store.editRabbit(currentRabbitId, newName);
		newName = '';
	}

	// unser "Konstruktor" (lifecycle hook) - läuft jedesmal, wenn die Seite bzw. die Komponente geladen wird:
	$effect(() => {
		store.listRabbits();
		$inspect('🐰: ', store.rabbits);
	});
</script>

<!-- unser Template / HTML-Teil der Seite bzw. der Komponente -->
<h1 class="text-3xl">Our Rabbits</h1>

<div class="grid w-[200px] grid-cols-[32px_1fr_32px_32px] items-end">
	<div>ID</div>
	<div>Name</div>
	<div></div>
	<div></div>

	{#each store.rabbits as rabbit}
		<div class="pr-3 text-right">{rabbit.id}</div>
		<div class="pr-3">{rabbit.name}</div>
		<div class="pr-3">
			<button
				onclick={() => {
					currentRabbitId = rabbit.id;
					editingModal.showModal();
				}}
				class="cursor-pointer"><Icon icon="carbon:edit" width="16" height="16" /></button
			>
		</div>
		<div>
			<button onclick={() => store.deleteRabbit(rabbit.id)} class="cursor-pointer text-red-500"
				>x</button
			>
		</div>
	{/each}
</div>

<dialog id="editingModal" class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Edit rabbit with ID {currentRabbitId}</h3>
		<input type="text" placeholder="new rabbit name" bind:value={newName} />
		<div class="modal-action">
			<form method="dialog" class="flex gap-2">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">Cancel</button><button class="btn btn-primary" onclick={editRabbit}
					>Change Name!</button
				>
			</form>
		</div>
	</div>
</dialog>

<RabbitForm></RabbitForm>
