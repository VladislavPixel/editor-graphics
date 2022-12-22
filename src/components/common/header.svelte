<script lang="ts">
	import ColorPalette from "../../assets/color-palette.svg";
	import type { EventInputType } from "../interface";

	export let nameFile: string = "";

	export let onUpdateInputFileName = (event: EventInputType): void => console.log(event);

	function isValidValueInput (valueInput: string): boolean {
		return valueInput.length > 0;
	}

	$: isErrorInput = !isValidValueInput(nameFile);
</script>

<header class="block-content__header header">
	<div class="header__container _container">
		<div class="header__input-container" title="Файл будет сохранен под этим именем.">
			<input on:input={onUpdateInputFileName} type="text" class="header__input" class:is-not-valid={isErrorInput} class:is-valid={!isErrorInput} placeholder="Начните вводить название файла" bind:value={nameFile}>
		</div>
		<a href="/" class="header__link-icon" title="Нажмите, для того, чтобы обновить страницу.">
			<img src={ColorPalette} alt="Палитра с кисточкой - иконка." class="header__image-icon">
		</a>
	</div>
</header>

<style lang="scss">
	.is-not-valid {
		border: 1px solid rgb(236, 102, 70);
	}

	.is-valid {
		border: 1px solid #66C0F4;
	}
</style>
