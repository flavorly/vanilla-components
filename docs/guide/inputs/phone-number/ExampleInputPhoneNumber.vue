<template>
  <!-- Regular -->
  <div class="space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-phone-number
      v-model:countryCode="countryCode"
      v-model:countryDialCode="countryDialCode"
      v-model:phone="phoneNumber"
      v-model:fullPhone="fullPhoneNumber"
      class="inline-flex"
      layout="naked"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <span class="border-1 border-t" />
    <ul>
      <li>Phone Number: {{ countryCode }}</li>
      <li>National Number: {{ phoneNumber }}</li>
      <li>Dial Code: {{ countryDialCode }}</li>
      <li>Full Phone Number: {{ fullPhoneNumber }}</li>
    </ul>
    <span class="border-1 border-b" />
  </div>

  <!-- Errors -->
  <div class="mt-5 space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-phone-number
      v-model:countryCode="countryCode"
      v-model:countryDialCode="countryDialCode"
      v-model:phone="phoneNumber"
      v-model:fullPhone="fullPhoneNumber"
      class="inline-flex"
      layout="naked"
      :errors="'Change me to clear the error'"
    />
  </div>
</template>

<script>
import { VanillaInputPhoneNumber } from "@/index";
export default {
  name: "ExampleInputPhoneNumber",
  components: {
    VanillaInputPhoneNumber,
  },
  data(){
      return {
        countryCode: 'US',
        phoneNumber: '4844578762',
        fullPhoneNumber: null,
        countryDialCode: null,
      }
  },
  mounted() {
    window.parent.postMessage('mounted', '*')
  },
}
</script>
