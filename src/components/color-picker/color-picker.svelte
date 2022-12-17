<script lang="ts">
	export let classes: string = "undefined";

	export let theme: string = "undefined";

	$: isDark = theme === "dark";

	export let onUpdateTheme = (): void => console.log("click");
	
</script>

<div class="{classes}__picker-color-container container-color-picker">
	<button on:click={onUpdateTheme} class:dark={isDark} class:light={!isDark} title="Нажмите для изменения цветовой темы редактора." class="container-color-picker__element"></button>
</div>

<style lang="scss">
	.dark {
		left: 3px;
		top: 2px;
		background-color: #202025;
	}

	.light {
		transform: translateX(45px);
		top: 2px;
		background-color: aliceblue;
	}
</style>