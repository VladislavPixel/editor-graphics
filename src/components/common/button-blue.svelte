<script lang="ts">
  export let text: string = "undefined";

  export let title: string = "Нажмите, чтобы зафиксировать действие.";

  export let classesParent: string = "undefined";

  export let onClickBtn = (): void => console.log("Handler click button");
</script>

<button on:click={onClickBtn} class="{classesParent}__btn-update btn-blue" {title} type="button">{text}</button>
