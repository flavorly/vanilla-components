<template>
  <!-- Regular -->
  <div class="space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-toggle
      v-model="value"
      class="inline-flex"
      layout="naked"
      :help="'Toggle me to see magic'"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <!-- Multiple -->
  <div class="mt-5 space-x-2 space-y-2 flex items-center justify-center mx-auto sm:space-y-0">
    <vanilla-input-toggle
      v-model="valueMultiple"
      :value="'foo'"
      class="inline-flex"
      layout="naked"
    />
    <vanilla-input-toggle
      v-model="valueMultiple"
      :value="'bar'"
      class="inline-flex"
      layout="naked"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(valueMultiple) }}</pre>
  </div>

  <!-- Errors -->
  <div class="mt-5 space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-toggle
      v-model="valueWithError"
      placeholder="Type to clear errors"
      class="inline-flex"
      layout="naked"
      :true-value="'checked'"
      :false-value="'unchecked'"
      :errors="'Sorry, option already taken'"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(valueWithError) }}</pre>
  </div>
</template>

<script>
import { VanillaInputToggle } from "@/index";
export default {
    name: "ExampleInputToggle",
    components: {
        VanillaInputToggle,
    },
    data(){
        return {
            value: false,
            valueMultiple: [],
            valueWithError: 'checked',
        }
    },
    mounted() {
        window.parent.postMessage('mounted', '*')
    },
}
</script>
