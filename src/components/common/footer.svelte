<script lang="ts">
	import FooterMenu from "../ui/footer-menu.svelte";

	let isShow: boolean = true;

	function handlerUpdateShow(): void {
		isShow = !isShow;
	}
</script>

<footer class:show={isShow} class:no-show={!isShow} class="block-content__footer footer">
	<FooterMenu {isShow} onUpdateShow={handlerUpdateShow} />
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
