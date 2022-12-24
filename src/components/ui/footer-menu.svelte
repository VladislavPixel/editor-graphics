<script lang="ts">
	import Arrow from "../../assets/arrow.svg";

	export let isShow: boolean = true;

	export let onUpdatePanelStatus = (typePanel: string): void => console.log("update panel status");
</script>

<div class="footer__menu">
	<button on:click={() => onUpdatePanelStatus("footerPanel")} class:show={isShow} class:no-show={!isShow} class="footer__btn-show" type="button" title="Нажмите, чтобы скрыть/открыть панель.">
		<img class="footer__img-arrow" src={Arrow} alt="Стрелочка голубая.">
	</button>
</div>

<style lang="scss">
	.show {
		img {
			transform: rotate(90deg);
		}
	}
	.no-show {
		img {
			transform: rotate(-90deg);
		}
	}
</style>
