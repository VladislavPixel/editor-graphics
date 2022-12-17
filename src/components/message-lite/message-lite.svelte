<script lang="ts">
  import Artist from "../../assets/artist.svg";

  export let classes: string = "undefined";

  export let text: string = "Что-то пошло не так...";
</script>

<div class="{classes}__message message">
  <div class="message__container">
    <img class="message__icon" src={Artist} alt="Иконка художника.">
    <p class="message__text">{text}</p>
  </div>
</div>
