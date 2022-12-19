<script lang="ts">
	import arrow from "../../assets/arrow.svg";
	import type { IPanel } from "../interface";
	import { arraySettingForPanel } from "../data";
	import SettingPanel from "../ui/setting-panel.svelte";

	export let classes: string = "undefined";

	export let title: string = "undefined";

	export let typePanel: string = "undefined";

	let isModalSetting = false;

	export let targetState: IPanel = {
		position: "bottom",
		status: true
	}

	export let onUpdatePanelStatus = (typePanel: string): void => console.log("update panel status");

	export let onUpdatePanelPosition = (newPosition: string, typePanel: string): void => console.log("update panel position");

	$: isLeft = targetState.position === "left";

	$: isRight = targetState.position === "right";

	$: isLeftShow = isLeft && targetState.status;

	$: isLeftNoShow = isLeft && !targetState.status;

	$: isRightShow = isRight && targetState.status;

	$: isRightNoShow = isRight && !targetState.status;

	function handlerClickUpdateModalSetting() {
		isModalSetting = !isModalSetting;
	}
</script>

<div class="{classes}__container-panel panel" class:right-panel-no-show={isRightNoShow} class:right-panel-show={isRightShow} class:left-panel-no-show={isLeftNoShow} class:left-panel-show={isLeftShow}>
	<div class="panel__setting-block block-setting">
		<button on:click={handlerClickUpdateModalSetting} title="Нажмите, чтобы развернуть окно настроек панели." class="block-setting__setting-el" type="button">•••</button>
		{#if isModalSetting}
		<div class="block-setting__modal modal-setting-panel" class:right-setting={isRight} class:left-setting={isLeft}>
			{#each arraySettingForPanel as { _id, title, imagePath, type } (_id)}
				<SettingPanel {typePanel} {onUpdatePanelPosition} {title} {type} {imagePath} positionCurrent={targetState.position} />
			{/each}
		</div>
		{/if}
	</div>
	<h2 class="panel__title">{title}</h2>
	<button on:click={() => onUpdatePanelStatus(typePanel)} type="button" class:right-btn-no-show={isRightNoShow} class:right-btn-show={isRightShow} class:left-btn-no-show={isLeftNoShow} class:left-btn-show={isLeftShow} title="Нажмите, чтобы скрыть/открыть панель." class="panel__btn-show">
		<img class="panel__arrow" src={arrow} alt="Иконка стрелочки - голубого цвета.">
	</button>
</div>

<style lang="scss">
	.left-btn-show {
		border-left: 27px solid rgb(44, 44, 44);
		left: 100%;
		img {
			left: -25px;
			transform: rotate(180deg);
		}
	}

	.left-btn-no-show {
		border-left: 27px solid rgb(44, 44, 44);
		left: 100%;
		img {
			left: -25px;
			transform: rotate(0deg);
		}
	}

	.right-btn-show {
		border-right: 27px solid rgb(44, 44, 44);
		right: 100%;
		img {
			left: 10px;
			transform: rotate(0deg);
		}
	}

	.right-btn-no-show {
		border-right: 27px solid rgb(44, 44, 44);
		right: 100%;
		img {
			left: 10px;
			transform: rotate(180deg);
		}
	}

	.left-panel-show {
		width: 11%;
		height: 100%;
		left: 0;
		top: 0;
	}

	.left-panel-no-show {
		width: 11%;
		height: 100%;
		left: 0;
		top: 0;
		transform: translateX(-100%);
	}

	.right-panel-show {
		width: 11%;
		height: 100%;
		top: 0;
		right: 0;
	}

	.right-panel-no-show {
		width: 11%;
		height: 100%;
		top: 0;
		right: 0;
		transform: translateX(100%);
	}

	.left-setting {
		top: 33px;
		left: 100%;
	}

	.right-setting {
		top: 33px;
		left: -75px;
	}
</style>
