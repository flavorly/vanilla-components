<template>
  <div class="space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-flags
      :country="'pt'"
      class="inline-flex"
    />
  </div>
</template>

<script>
import { VanillaFlags } from "@/index";
export default {
  name: "ExampleComponent",
  components: {
    VanillaFlags
  },
}
</script>
