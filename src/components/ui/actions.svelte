<script lang="ts">
	import { arrayActions } from "../../data";
	import Action from "./action.svelte";
	import MessageLite from "../common/message-lite.svelte";
	import ColorPicker from "./color-picker.svelte";
	import type { ModalTypes, Theme } from "../../interface";

	let parentClasses: string = "actions";

	export let theme: Theme = "dark";

	export let onUpdateTheme = (): void => console.log("click");

	export let onClickAction = (newType: ModalTypes): void => console.log("click-action");
</script>

<div class="block-content__actions actions">
	<div class="actions__container _container">
		<div class="actions__btn-block">
			{#each arrayActions as { _id, title, type } (_id) }
				<Action {onClickAction} {title} {type} />
				{:else}
				<MessageLite classes={parentClasses} text="Что-то пошло не так. Панель действий пустая." />
			{/each}
		</div>
		<ColorPicker {theme} classes={parentClasses} {onUpdateTheme} />
	</div>
</div>
