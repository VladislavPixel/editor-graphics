<script lang="ts">
	import arrow from "../../assets/arrow.svg";

	export let classes: string = "undefined";

	export let toolsPanel = {
		position: "left",
		status: true
	};

	export let onUpdatePanelStatus = (typePanel: "toolsPanel"): void => console.log("update panel status");

	$: isLeftShow = toolsPanel.position === "left" && toolsPanel.status;

	$: isLeftNoShow = toolsPanel.position === "left" && !toolsPanel.status;
</script>

<div class="{classes}__container-tools tools-container" class:left-no-show={isLeftNoShow} class:left-show={isLeftShow}>
	<h2 class="tools-container__title">Инструменты:</h2>
	<button on:click={() => onUpdatePanelStatus("toolsPanel")} title="Нажмите, чтобы скрыть/открыть панель." class="tools-container__btn-show">
		<img class="tools-container__arrow" src={arrow} alt="Иконка стрелочки - голубого цвета.">
	</button>
</div>

<style lang="scss">
	.left-show {
		width: 11%;
		height: 100%;
		left: 0;
		top: 0;
	}

	.left-no-show {
		width: 11%;
		height: 100%;
		left: 0;
		top: 0;
		transform: translateX(-100%);
		.tools-container__arrow {
			transform: rotate(0deg);
		}
	}
</style>
