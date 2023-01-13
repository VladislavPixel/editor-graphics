<script lang="ts">
	import type { Tool, ICanvas, EventInputType } from "../../interface";
	import { arrayTools } from "../../data";

	export let classesParent: string = "undefined";

	export let canvas: ICanvas | undefined;

	export let currentTool: Tool | null;

	if (canvas === undefined) {
		throw new Error("The canvas state should be passed to the component");
	}

	export let onChangeTool = (tool: Tool): void => console.log(`выбран инструмент ${tool}`);

	function handlerInputSetting(eventEl: EventInputType, setting): void {
		setting.onChange(eventEl.target?.value);
	}
</script>

<div class="{classesParent}__tools-block tools">
	<div class="tools__container">
		{#each arrayTools as toolElement, i (toolElement._id)}
			<div class="tools__container-btn-tool{currentTool === null ? "" : currentTool["constructor"].name === toolElement.constructorClass.name ? " target" : ""}">
				<button title="Нажмите, чтобы выбрать - {toolElement.imgTitle}." on:click={() => {
					const ConstructorClass = toolElement.constructorClass;

					onChangeTool(new ConstructorClass(canvas));
				}} type="button" class="tools__btn">
					<img class="tools__img-tool" src={toolElement.imgPath} alt="Иконка - {toolElement.imgTitle}">
				</button>
			</div>
		{/each}
	</div>

	<div class="tools__setting-container">
			<div class="tools__setting-title">Настройки:</div>
			<div class="tools__container-setting-items">
				{#if currentTool?.settings}
					{#each currentTool.settings as setting}
						<div class="tools__item">
							<label for={setting.key}>{setting.label}</label>
							<input on:change={(event) => {
								handlerInputSetting(event, setting)
							}} id={setting.key} type={setting.type}/>
						</div>
					{/each}
				{/if}
			</div>
	</div>
</div>
