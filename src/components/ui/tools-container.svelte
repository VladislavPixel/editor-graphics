<script lang="ts">
	import Brush from "../../tools/Brush";
	import Rect from "../../tools/Rect";
	import Circle from "../../tools/Circle";
	import Eraser from "../../tools/Eraser";
	import Line from "../../tools/Line";
	import type { Tool, ICanvas, EventInputType, IEnginCanvas } from "../../interface";

	export let classesParent: string = "undefined";

	export let canvas: ICanvas | undefined;

	export let currentTool: Tool | null;

	export let engineCanvas: undefined | IEnginCanvas;

	if (canvas === undefined || engineCanvas === undefined) {
		throw new Error("The canvas state should be passed to the component");
	}

	export let onChangeTool = (tool: Tool): void => console.log(`выбран инструмент ${tool}`);

	function handlerInputSetting(eventEl: EventInputType, setting): void {
		setting.onChange(eventEl.target?.value);
	}
</script>

<div class="{classesParent}__tools-block tools">
    <button type="button" class="tools__btn" on:click={() => onChangeTool(new Brush(canvas, engineCanvas))}>
      Кисть
    </button>
    <!-- <button type="button" class="tools__btn" on:click={() => onChangeTool(new Rect(canvas, engineCanvas))}>
      Прямоугольник
    </button>
    <button type="button" class="tools__btn" on:click={() => onChangeTool(new Circle(canvas, engineCanvas))}>
      Круг
    </button>
    <button type="button" class="tools__btn" on:click={() => onChangeTool(new Eraser(canvas, engineCanvas))}>
      Ластик
    </button>
    <button type="button" class="tools__btn" on:click={() => onChangeTool(new Line(canvas, engineCanvas))}>
      Линия
    </button> -->

    <div class="setting-tools__container">
        <div class="setting-tools__title">Настройки:</div>
        {#if currentTool?.settings}
					{#each currentTool.settings as setting}
						<div class="setting-tools__item">
							<label for={setting.key}>{setting.label}</label>
							<input on:change={(event) => {
								handlerInputSetting(event, setting)
							}} id={setting.key} type={setting.type}/>
						</div>
					{/each}
        {/if}
    </div>
</div>

<style lang="scss">
	.setting-tools__container {
		margin-top: 30px;
		width: 100%;
	}

	.setting-tools__title {
		color: aliceblue;
		font-weight: bold;
		margin-bottom: 20px;
	}

	.setting-tools__item {
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin-bottom: 20px;

		input {
			max-width: 40px;
		}
	}
</style>
