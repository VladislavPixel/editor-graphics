<script lang="ts">
	import type { IModal, ModalTypes } from "../../interface";
	import Blot from "../../assets/blot.svg";
	import Close from "../../assets/close.svg";
	import SizeCanvasForm from "../ui/size-canvas-form.svelte";

	export let classesParent: string = "undefined";

	export let modal: undefined | IModal;

	export let onClickAction = (newType: ModalTypes): void => console.log("click-action");

	export let onUpdateSizeCanvas = (width: string, height: string):void => console.log("Update size canvas");

	if (modal === undefined) {
		throw new Error("Modal has been init in Editor.");
	}
</script>

<div class="{classesParent}__modal modal-block">
	<div class="modal-block__container">
		<button on:click={() => onClickAction("action-undefined")} title="Нажмите, чтобы закрыть модальное окно." type="button" class="modal-block__btn-close">
			<img src={Close} class="modal-block__img-close" alt="Иконка крестика.">
		</button>
		<div class="modal-block__img-container">
			<img title="Клякса неопытного художника." class="modal-block__icon-img" src={Blot} alt="Иконка кляксы.">
		</div>
		<h2 class="modal-block__title">{modal?.title}</h2>
		<p class="modal-block__sub-title">{modal?.offer}</p>
		{#if modal?.currentTypeModal === "action-size-canvas"}
			<SizeCanvasForm {onUpdateSizeCanvas} {onClickAction} />
		{/if}
	</div>
</div>
