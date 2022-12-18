<script lang="ts">
	import arrow from "../../assets/arrow.svg";

	export let classes: string = "undefined";

	export let layersPanel = {
		position: "right",
		status: true
	};

	export let onUpdatePanelStatus = (typePanel: "layersPanel"): void => console.log("update panel status");

	$: isRightShow = layersPanel.position === "right" && layersPanel.status;

	$: isRightNoShow = layersPanel.position === "right" && !layersPanel.status;
</script>

<div class="{classes}__container-layers layers-container" class:right-no-show={isRightNoShow} class:right-show={isRightShow}>
	<h2 class="layers-container__title">Слои:</h2>
	<button on:click={() => onUpdatePanelStatus("layersPanel")} title="Нажмите, чтобы скрыть/открыть панель." class="layers-container__btn-show">
		<img class="layers-container__arrow" src={arrow} alt="Иконка стрелочки - голубого цвета.">
	</button>
</div>

<style lang="scss">
	.right-show {
		width: 8%;
		height: 100%;
		right: 0;
		top: 0;
	}

	.right-no-show {
		width: 8%;
		height: 100%;
		right: 0;
		top: 0;
		transform: translateX(100%);
		.layers-container__arrow {
			transform: rotate(180deg);
		}
	}
</style>
