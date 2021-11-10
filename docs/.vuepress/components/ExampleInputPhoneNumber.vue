<template>
  <!-- Regular -->
  <div class="space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <x-input-phone-number
      v-model:countryCode="countryCode"
      v-model:countryDialCode="countryDialCode"
      v-model:phone="phoneNumber"
      v-model:fullPhone="fullPhoneNumber"
      class="inline-flex"
      layout="naked"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <table class="bg-white">
      <thead>
        <tr>
          <td>Prop</td>
          <td>Value</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Country Code</td>
          <td>{{countryCode }}</td>
        </tr>
        <tr>
          <td>National Number</td>
          <td>{{ phoneNumber }}</td>
        </tr>
        <tr>
          <td>Dial Code</td>
          <td>{{ countryDialCode }}</td>
        </tr>
        <tr>
          <td>Full Phone Number</td>
          <td>{{ fullPhoneNumber }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Errors -->
  <div class="mt-5 space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <x-input-phone-number
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
import {XInputPhoneNumber} from "@/index";
export default {
  name: "ExampleInputPhoneNumber",
  components: {
    XInputPhoneNumber,
  },
  data(){
      return {
        countryCode: 'US',
        phoneNumber: '4844578762',
        fullPhoneNumber: null,
        countryDialCode: null,
      }
  },
}
</script>
