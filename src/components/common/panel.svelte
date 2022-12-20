<script lang="ts">
	import arrow from "../../assets/arrow.svg";
	import type { IPanel } from "../interface";
	import { arraySettingForPanel } from "../data";
	import SettingPanel from "../ui/setting-panel.svelte";

	export let classes: string = "undefined";

	export let title: string = "undefined";

	export let typePanel: string = "undefined";

	export let description: string = "Панель, для хранения элементов";

	export let targetState: IPanel = {
		position: "top",
		status: true
	}

	export let onUpdatePanelStatus = (typePanel: string): void => console.log("update panel status");

	export let onUpdatePanelPosition = (newPosition: string, typePanel: string): void => console.log("update panel position");

	let isModalSetting: boolean = false;

	const isLayersPanel: boolean = typePanel === "layersPanel";

	$: isLeft = targetState.position === "left";

	$: isRight = targetState.position === "right";

	$: isTop = targetState.position === "top";

	$: isTopShow = isTop && targetState.status;

	$: isTopNoShow = isTop && !targetState.status;

	$: isLeftShow = isLeft && targetState.status;

	$: isLeftNoShow = isLeft && !targetState.status;

	$: isRightShow = isRight && targetState.status;

	$: isRightNoShow = isRight && !targetState.status;

	$: classesForTypePanel = typePanel === "toolsPanel" && (isLeft || isRight)
		? " tool-in-working-area"
		: typePanel === "layersPanel" && (isLeft || isRight) ? " layers-in-working-area"
		: "";

	function handlerClickUpdateModalSetting(): void {
		isModalSetting = !isModalSetting;
	}

	export let dataForRender: string[] = [];
</script>

<div title={description} class:is-layers-panel={isLayersPanel} class="{classes}__container-panel panel{classesForTypePanel}" class:right-panel-no-show={isRightNoShow} class:right-panel-show={isRightShow} class:left-panel-no-show={isLeftNoShow} class:left-panel-show={isLeftShow}>
	<div class="panel__head">
		<div class:left-panel={isLeft} class:right-panel={isRight} class="panel__setting-block block-setting">
			{#if isTop}
				<button class:btn-show-top={isTopShow} class:btn-no-show-top={isTopNoShow} title="Нажмите, чтобы скрыть/открыть панель." on:click={() => onUpdatePanelStatus(typePanel)} class="block-setting__btn-show" type="button">
					<img class="block-setting__arrow" src={arrow} alt="Иконка стрелочки - голубого цвета.">
				</button>
			{/if}
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
	</div>
	<div class="panel__block">
		{#if isTopShow}
			<div class="panel__content">
				{#each dataForRender as element }
					<div class="panel__element-block">{element}</div>
				{/each}
			</div>
		{/if}
	</div>
	<button on:click={() => onUpdatePanelStatus(typePanel)} type="button" class:right-btn-no-show={isRightNoShow} class:right-btn-show={isRightShow} class:left-btn-no-show={isLeftNoShow} class:left-btn-show={isLeftShow} title="Нажмите, чтобы скрыть/открыть панель." class="panel__btn-show">
		<img class="panel__arrow" src={arrow} alt="Иконка стрелочки - голубого цвета.">
	</button>
</div>

<style lang="scss">
	.is-layers-panel {
		z-index: 50;
	}
	.btn-show-top {
		transform: rotate(-90deg);
	}

	.btn-no-show-top {
		transform: rotate(90deg);
	}

	.left-panel {
		justify-content: flex-end;
	}

	.right-panel {
		justify-content: flex-start;
	}

	.tool-in-working-area {
		width: 11%;
		height: 100%;
	}

	.layers-in-working-area {
		width: 7%;
		height: 100%;
	}

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
		left: 0;
		top: 0;
	}

	.left-panel-no-show {
		left: 0;
		top: 0;
		transform: translateX(-100%);
	}

	.right-panel-show {
		top: 0;
		right: 0;
	}

	.right-panel-no-show {
		top: 0;
		right: 0;
		transform: translateX(100%);
	}

	.left-setting {
		top: -5px;
		left: 102%;
	}

	.right-setting {
		top: -5px;
		left: -215px;
	}
</style>
