<script lang="ts">
  import type { EventInputType } from "../../interface";

  export let label: string = "undefined";

  export let id: string = "undefined";

  export let title: string = "Введите значение.";

  export let placeholder: string = "В это поле вы должны указать свое значение";

  export let classes: string = "undefined";

  export let onInput = (event: EventInputType): void => console.log("update input", event);
</script>

<div class="{classes}__field-block block-field">
  <label class="block-field__label-field" for={id}>{label}</label>
  <input on:input={onInput} {id} class="block-field__input" type="text" {placeholder} {title}>
</div>
