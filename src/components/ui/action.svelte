<script lang="ts">
	import type { ModalTypes } from "../../interface";

	export let title = "Undefined";

	export let type: ModalTypes = "action-undefined";

	export let onClickAction = (newType: ModalTypes): void => console.log("click-action");
</script>

<button on:click={() => onClickAction(type)} type="button" class="actions__btn" title="Нажмите, для того чтобы /{title}/">
	{title}
</button>
