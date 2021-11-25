<template>
  <!-- Regular -->
  <div class="space-x-2 space-y-2 w-full items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <x-input-select
      v-model="value"
      class="inline-flex"
      :options="options"
      layout="naked"
      :help="'Im useful helper out here, choose wisely'"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <!-- Errors -->
  <div class="mt-5 space-x-2 space-y-2 w-full items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <x-input-select
      v-model="value2"
      class="inline-flex"
      :options="options"
      layout="naked"
      :errors="'Sorry the option is invalid.'"
    />
  </div>
</template>

<script>
import { VanillaInputSelect as XInputSelect } from "@/index";
export default {
  name: "ExampleInputSelect",
  components: {
    XInputSelect
  },
  data(){
      return {
        value: null,
        value2: null,
      }
  },
  computed: {
    options(){
      return [
        {value: 'roberto', label: 'Roberto Boes'},
        {value: 'pedro', label: 'Pedro Boes'},
        {
          value: [
            { foo: 'bar', nested: 'deep'}
          ],
          label: 'Complex Object'
        }
      ]
    }
  },
  mounted() {
    window.parent.postMessage('mounted', '*')
  }
}
</script>
