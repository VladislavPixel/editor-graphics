<script lang="ts">
	import Plus from "../../assets/plus.svg";

	export let classesParent: string = "undefined";

	export let onCreateCanvas = (): void => console.log("problem create canvas");

</script>

<div class="{classesParent}__layers-block layers">
	<div class="layers__container-create-btn">
		<button on:click={onCreateCanvas} title="Нажмите, чтобы создать новый слой. Каждый последующий слой накладывается на предыдущий." class="layers__create-btn" type="button">
			<img class="layers__plus-img" src={Plus} alt="Значок плюсика - для добавления слоя.">
		</button>
	</div>
</div>
