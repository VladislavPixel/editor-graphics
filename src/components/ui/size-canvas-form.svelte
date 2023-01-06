<script lang="ts">
  import ButtonBlue from "../common/button-blue.svelte";
  import TextField from "../common/text-field.svelte";
  import type { EventInputType, ModalTypes } from "../../interface";

  const classesParent = "size-form-block";

  $: stateWidth = "";

  $: stateHeight = "";

  export let onUpdateSizeCanvas = (width: string, height: string):void => console.log("Update size canvas");

  export let onClickAction = (newType: ModalTypes): void => console.log("click-action");

  function handlerClickBtn(): void {
    onUpdateSizeCanvas(stateWidth, stateHeight);
    onClickAction("action-undefined");
  }

  function handlerInput({ currentTarget }: EventInputType): void {
    const { id } = currentTarget;

    if (id === "width-id") {
      stateWidth = currentTarget.value;
    }

    if (id === "height-id") {
      stateHeight = currentTarget.value;
    }
  }
</script>

<div class="modal-block__form-size-container size-form-block">
  <TextField onInput={handlerInput} classes="size-form-block" id="width-id" label="Ширина:" title="Вводить нужно только цифры." placeholder="Тут вы можете указать ширину" />
  <TextField onInput={handlerInput} classes="size-form-block" id="height-id" label="Высота:" title="Вводить нужно только цифры." placeholder="Тут вы можете указать высоту" />
  <ButtonBlue onClickBtn={handlerClickBtn} {classesParent} text="Обновить" title="Нажмите, чтобы зафиксировать новые размеры." />
</div>
