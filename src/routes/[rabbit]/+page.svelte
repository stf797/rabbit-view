<script>
	import EditingModal from '$lib/components/EditingModal.svelte';
	import { page } from '$app/stores';
</script>

<EditingModal currentRabbitId={$page.params.rabbit}></EditingModal>
