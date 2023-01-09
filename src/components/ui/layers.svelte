<script lang="ts">
	import type { ICanvas } from "../../interface";
	import { storeCanvas } from "../../store/store-canvas";
	import Plus from "../../assets/plus.svg";

	export let classesParent: string = "undefined";

	export let canvas: ICanvas | undefined;

	export let onCreateCanvas = (): void => console.log("problem create canvas");

	if (canvas === undefined) {
		throw new Error("Canvas has been defined!");
	}

	$: counterLayers = canvas!.counterLayers;

	$: arrayForIndexesLayers = canvas!.arrayForIndexesLayers;

	$: currentLayer = canvas!.currentLayer;

	function updateCurrentLayer(newValue: number): void {
		storeCanvas.update((value: ICanvas): ICanvas => {
			value.updateCurrentLayer(newValue);

			return value;
		});
	}
</script>

<div class="{classesParent}__layers-block layers">
	<div class="layers__container-create-btn">
		<button on:click={onCreateCanvas} title="Нажмите, чтобы создать новый слой. Каждый последующий слой накладывается на предыдущий." class="layers__create-btn" type="button">
			<img class="layers__plus-img" src={Plus} alt="Значок плюсика - для добавления слоя.">
		</button>
		{#if counterLayers > 0}
			{#each arrayForIndexesLayers as indexes, i (i)}
				<button on:click={() => updateCurrentLayer(i)} title="Нажмите, чтобы начать работать именно с этим слоем. Его номер: {i}." class="layers__layer-btn{i === currentLayer ? " target" : ""}" type="button">Слой: {i}</button>
			{/each}
		{/if}
	</div>
</div>
