<script lang="ts">
	import checkIcon from "../../assets/check.svg";

	export let title: string = "undefined";

	export let type: string = "bottom";

	export let imagePath: string = "";

	export let positionCurrent: string = "";

	export let typePanel: string = "undefined";

	export let onUpdatePanelPosition = (newPosition: string, typePanel: string) => console.log("update panel position");
</script>

<div class="modal-setting-panel__element">
	<div class="modal-setting-panel__column">
		<img class="modal-setting-panel__image" src={imagePath} alt="Иконка позиции панели.">
		<button on:click={() => onUpdatePanelPosition(type, typePanel)} title="Нажмите, чтобы /{title}/" class="modal-setting-panel__title">{title}</button>
	</div>
	<div class="modal-setting-panel__column">
		{#if type === positionCurrent}
			<img class="modal-setting-panel__check-img" src={checkIcon} alt="Иконка галочки, для отметки текущей позиции панели">
		{/if}
	</div>
</div>
