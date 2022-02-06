<template>
  <!-- Regular -->
  <div class="space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-profile-photo
      v-model="path"
      :help="'Toggle me to see magic'"
      :photo="null"
      layout="naked"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ path }}</pre>
  </div>


  <!-- Errors -->
  <div class="mt-5 space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-profile-photo
      v-model="pathWithErrors"
      :photo="null"
      layout="naked"
      :errors="'Sorry, option already taken'"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ pathWithErrors }}</pre>
  </div>
</template>

<script>
import { VanillaInputProfilePhoto } from "@/index";
export default {
    name: "ExampleInputToggle",
    components: {
        VanillaInputProfilePhoto,
    },
    data(){
        return {
            path: null,
            pathWithErrors: null,
        }
    },
    mounted() {
        window.parent.postMessage('mounted', '*')
    },
}
</script>
