<template>
  <!-- Regular -->
  <div class="space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-text
      v-model="value"
      placeholder="Elon Musk"
      class="inline-flex"
      layout="naked"
      :help="'Im useful helper out here, choose wisely'"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <!-- Errors -->
  <div class="mt-5 space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-text
      v-model="value2"
      placeholder="Type to clear errors"
      class="inline-flex"
      layout="naked"
      :errors="'Sorry for this name is already taken'"
    />
  </div>
</template>

<script>
import { VanillaInputText } from "@/index";
export default {
    name: "ExampleInputText",
    components: {
        VanillaInputText,
    },
    data(){
        return {
            value: null,
            value2: null,
        }
    },
    mounted() {
        window.parent.postMessage('mounted', '*')
    },
}
</script>
