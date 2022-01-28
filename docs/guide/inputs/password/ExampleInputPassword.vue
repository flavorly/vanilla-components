<template>
  <!-- Regular -->
  <div class="space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-password
      v-model="value"
      placeholder="Your secure Password"
      class="inline-flex"
      layout="naked"
      :help="'Must have at least 30 symbols and 8 characters'"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <!-- Errors -->
  <div class="mt-5 space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-password
      v-model="value2"
      placeholder="Type to clear errors"
      class="inline-flex"
      layout="naked"
      :errors="'Sorry but this password is insecure'"
    />
  </div>
</template>

<script>
import { VanillaInputPassword } from "@/index";
export default {
    name: "ExampleInputPassword",
    components: {
        VanillaInputPassword,
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
