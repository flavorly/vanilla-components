<template>
  <div class="space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-button class="inline-flex">
      Primary
    </vanilla-button>

    <vanilla-button class="inline-flex" variant="danger">
      Danger
    </vanilla-button>

    <vanilla-button class="inline-flex" variant="secondary">
      Danger
    </vanilla-button>

    <vanilla-button class="inline-flex" :loading="true">
      Loading
    </vanilla-button>

    <vanilla-button class="inline-flex" :invalid="true">
      Loading
    </vanilla-button>
  </div>
</template>

<script>
import {VanillaButton} from "./../../../src/index";
export default {
  name: "ExampleButtons",
  components: {
    VanillaButton
  },
  mounted() {
    window.parent.postMessage('mounted', '*')
  },
}
</script>
