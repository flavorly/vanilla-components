<template>
  <!-- Regular -->
  <div class="space-x-2 w-full space-y-2 items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-country
      v-model="countryCode"
      v-model:countryCode="countryCode"
      v-model:countryDialCode="dialCode"
      v-model:countryName="name"
      class="inline-flex"
      layout="naked"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <span class="border-1 border-t" />
    <ul>
      <li>Country: {{ countryCode }}</li>
      <li>Dial Code: {{ dialCode }}</li>
      <li>Name: {{ name }}</li>
    </ul>
    <span class="border-1 border-b" />
  </div>

  <!-- Errors -->
  <div class="mt-5 space-x-2 w-full space-y-2 items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-country
      v-model="countryCode"
      v-model:countryCode="countryCode"
      v-model:countryDialCode="dialCode"
      v-model:countryName="name"
      class="inline-flex"
      layout="naked"
      :errors="'Change me to clear the error'"
    />
  </div>
</template>

<script>
import { VanillaInputCountry } from "@/index";
export default {
    name: "ExampleInputCountry",
    components: {
        VanillaInputCountry,
    },
    data(){
        return {
            countryCode: 'PT',
            dialCode: null,
            name: null,
        }
    },
    mounted() {
        window.parent.postMessage('mounted', '*')
    },
}
</script>
