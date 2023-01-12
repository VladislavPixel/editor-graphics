<script lang="ts">
	import type { ICanvas } from "../../interface";
	import { storeCanvas } from "../../store/store-canvas";
	import Plus from "../../assets/plus.svg";
	import DeleteBasket from "../../assets/delete-basket.svg";

	export let classesParent: string = "undefined";

	export let canvas: ICanvas | undefined;

	export let onCreateCanvas = (): void => console.log("problem create canvas");

	if (canvas === undefined) {
		throw new Error("Canvas has been defined!");
	}

	$: counterLayers = canvas!.counterLayers;

	$: arrayForLayersUi = new Array(counterLayers);

	$: currentLayer = canvas!.currentLayer;

	function updateCurrentLayer(newValue: number): void {
		storeCanvas.update((value: ICanvas): ICanvas => {
			value.updateCurrentLayer(newValue);

			return value;
		});
	}

	function handlerDeleteLayer(indexLayer: number): void {
		storeCanvas.update((value: ICanvas): ICanvas => {
			value.deleteLayer(indexLayer);

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
			{#each arrayForLayersUi as indexes, i (i)}
				<button on:click={() => updateCurrentLayer(i)} title="Нажмите, чтобы начать работать именно с этим слоем. Его номер: {i}." class="layers__layer-btn{i === currentLayer ? " target" : ""}" type="button">
					Слой: {i}
					<button on:click={() => handlerDeleteLayer(i)} title="Нажмите, чтобы удалить этот слой. Его номер {i}." type="button" class="layers__delete-layer">
						<img class="layers__icon-delete" src={DeleteBasket} alt="Иконка мусорной корзины.">
					</button>
				</button>
			{/each}
		{/if}
	</div>
</div>
