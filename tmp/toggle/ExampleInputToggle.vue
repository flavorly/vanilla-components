<template>
  <!-- Regular -->
  <div class="space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-toggle
      v-model="value"
      :help="'Toggle me to see magic'"
      :label="'Toggle me'"
      :label-after="false"
      layout="naked"
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
      layout="naked"
    />
    <vanilla-input-toggle
      v-model="valueMultiple"
      :value="'bar'"
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
      :value="'checked'"
      placeholder="Type to clear errors"
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
            valueMultiple: ['foo'],
            valueWithError: 'checked',
        }
    },
    mounted() {
        window.parent.postMessage('mounted', '*')
    },
}
</script>
