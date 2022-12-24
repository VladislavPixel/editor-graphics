<script lang="ts">
	import type { IPanel } from "../../interface";
	import FooterMenu from "../ui/footer-menu.svelte";

	export let footerPanel: IPanel = {
		status: true,
		position: "bottom"
	};

	export let onUpdatePanelStatus = (typePanel: string): void => console.log("update panel status");
</script>

<footer class:show={footerPanel.status} class:no-show={!footerPanel.status} class="block-content__footer footer">
	<FooterMenu isShow={footerPanel.status} {onUpdatePanelStatus} />
	<div class="footer__container _container">
		<p class="footer__text">Графический редактор. Разработка: 2022г.</p>
	</div>
</footer>

<style lang="scss">
	.show {
		transform: translateY(0px);
	}
	.no-show {
		transform: translateY(36px);
	}
</style>
