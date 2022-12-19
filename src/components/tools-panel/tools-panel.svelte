<script lang="ts">
	import arrow from "../../assets/arrow.svg";
	import SettingPanel from "../setting-panel/setting-panel.svelte";
	import { arraySettingForPanel } from "../data";

	export let classes: string = "undefined";

	let typePanel: string = "toolsPanel";

	export let toolsPanel = {
		position: "left",
		status: true
	};

	export let onUpdatePanelStatus = (typePanel: string): void => console.log("update panel status");

	export let onUpdatePanelPosition = (newPosition: string, typePanel: string): void => console.log("update panel position");

	let isModalSetting = false;

	$: isLeft = toolsPanel.position === "left";

	$: isRight = toolsPanel.position === "right";

	$: isRightShow = isRight && toolsPanel.status;

	$: isLeftShow = isLeft && toolsPanel.status;

	$: isLeftNoShow = isLeft && !toolsPanel.status;

	function handlerClickUpdateModalSetting() {
		isModalSetting = !isModalSetting;
	}
</script>

<div class="{classes}__container-tools tools-container" class:right-show={isRightShow} class:left-no-show={isLeftNoShow} class:left-show={isLeftShow}>
	<div class="tools-container__setting-block">
		<button on:click={handlerClickUpdateModalSetting} title="Нажмите, чтобы развернуть окно настроек панели." class="tools-container__setting-el">•••</button>
		{#if isModalSetting}
		<div class="tools-container__modal modal-setting-panel" class:right={isRight} class:left={isLeft}>
			{#each arraySettingForPanel as { _id, title, imagePath, type } (_id)}
				<SettingPanel {typePanel} {onUpdatePanelPosition} {title} {type} {imagePath} positionCurrent={toolsPanel.position} />
			{/each}
		</div>
		{/if}
	</div>
	<h2 class="tools-container__title">Инструменты:</h2>
	<button on:click={() => onUpdatePanelStatus(typePanel)} title="Нажмите, чтобы скрыть/открыть панель." class="tools-container__btn-show">
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

	.right-show {
		width: 11%;
		height: 100%;
		top: 0;
		right: 0;
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

	.left {
		top: 33px;
		left: 100%;
	}

	.right {
		top: 33px;
		left: -45px;
	}
</style>
