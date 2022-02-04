<template>
  <!-- Regular -->
  <div class="space-x-2 space-y-2 w-full items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-date-time-picker
      v-model="value"
      class="inline-flex"
      layout="naked"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <!-- Errors -->
  <div class="space-x-2 space-y-2 w-full items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-date-time-picker
      v-model="value"
      class="inline-flex"
      layout="naked"
      :errors="'This date is invalid'"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>
</template>

<script>
import { VanillaInputDateTimePicker } from "@/index";
export default {
    name: "ExampleInputRichSelect",
    components: {
        VanillaInputDateTimePicker
    },
    data(){
        return {
            value: '2011-01-01 0:00:01',
        }
    },
    mounted() {
        window.parent.postMessage('mounted', '*')
    }
}
</script>
