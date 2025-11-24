<script>
	import EditingModal from '$lib/components/EditingModal.svelte';
	import { page } from '$app/stores';
</script>

{JSON.stringify($page)}
<EditingModal currentRabbitId={$page.params.rabbit}></EditingModal>
