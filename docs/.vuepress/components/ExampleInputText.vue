<template>
  <!-- Regular -->
  <div class="space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <x-input-text
      placeholder="Your name"
      class="inline-flex"
      layout="naked"
      v-model="value"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <!-- Errors -->
  <div class="mt-5 space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <x-input-text
      placeholder="Type to clear errors"
      class="inline-flex"
      layout="naked"
      v-model="value2"
      :errors="'Change me to clear the error'"
    />
  </div>

  <!-- Helper -->
  <div class="mt-5 space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <x-input-text
      placeholder="Help me bro"
      class="inline-flex"
      layout="naked"
      v-model="value"
      :help="'Im useful helper out here, choose wisely'"
    />
  </div>
</template>

<script>
import { VanillaInputText as XInputText } from "@/index";
export default {
  name: "ExampleInputSelect",
  components: {
    XInputText,
  },
  data(){
      return {
        value: null,
        value2: null,
      }
  },
}
</script>
