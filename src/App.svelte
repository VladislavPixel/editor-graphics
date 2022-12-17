<script lang="ts">
	import Header from "./components/header/header.svelte";
  import Footer from "./components/footer/footer.svelte";
  import Actions from "./components/actions-container/actions.svelte";
  import WorkingArea from "./components/working-area/working-area.svelte";
  import type { EventInputType, ISettingsEditor } from "./components/interface";

  let nameFile: string = "";

  let settingsEditor: ISettingsEditor = {
    theme: "dark",
    toolsPanel: {
      position: "left",
      status: true
    },
    layersPanel: {
      position: "right",
      status: true
    },
    footerPanel: {
      status: true
    }
  };

  function handlerInputFileName ({ currentTarget }: EventInputType): void {
    if (currentTarget) {
      nameFile = currentTarget.value;
    }
  }

</script>

<div class="wrapper">
  <main class="wrapper__content block-content {settingsEditor.theme}">
    <Header {nameFile} onUpdateInputFileName={handlerInputFileName} />
    <Actions />
    <WorkingArea />
    <Footer />
  </main>
</div>
