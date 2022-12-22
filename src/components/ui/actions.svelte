<script lang="ts">
	import { arrayActions } from "../../data";
	import Action from "./action.svelte";
	import MessageLite from "../common/message-lite.svelte";
	import ColorPicker from "./color-picker.svelte";

	let parentClasses: string = "actions";

	export let theme: string = "undefined";

	export let onUpdateTheme = (): void => console.log("click");
</script>

<div class="block-content__actions actions">
	<div class="actions__container _container">
		<div class="actions__btn-block">
			{#each arrayActions as { _id, title, type } (_id) }
				<Action {title} {type} />
				{:else}
				<MessageLite classes={parentClasses} text="Что-то пошло не так. Панель действий пустая." />
			{/each}
		</div>
		<ColorPicker {theme} classes={parentClasses} {onUpdateTheme} />
	</div>
</div>
