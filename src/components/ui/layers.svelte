<script lang="ts">
	import type { IEnginCanvas } from "../../interface";
	import { storeEnginCanvas } from "../../store/store-engin-canvas";
	import Plus from "../../assets/plus.svg";

	export let classesParent: string = "undefined";

	export let engineCanvas: undefined | IEnginCanvas;

	export let onCreateCanvas = (): void => console.log("problem create canvas");

	if (engineCanvas === undefined) {
		throw new Error("EnginCanvas is not defined!");
	}

	$: counterLayers = engineCanvas!.counterLayers;

	$: arrayForIndexesLayers = engineCanvas!.arrayForIndexesLayers;

	$: currentLayer = engineCanvas!.currentLayer;

	function updateCurrentLayer(newValue: number): void {
		storeEnginCanvas.update((value: IEnginCanvas): IEnginCanvas => {
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
