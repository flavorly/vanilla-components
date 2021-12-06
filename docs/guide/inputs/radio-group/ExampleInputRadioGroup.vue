<template>
  <!-- Regular -->
  <div class="space-x-2 space-y-2 w-full items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-radio-group
      v-model="value"
      class="inline-flex"
      :options="options"
      :dark="isDark"
      layout="naked"
    />
  </div>
  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <!-- Separated -->
  <div class="mt-5 space-x-2 space-y-2 w-full items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-radio-group
      v-model="value"
      class="inline-flex"
      :options="options"
      :separated="true"
      :dark="isDark"
      layout="naked"
    />
  </div>
  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <!-- Radio -->
  <div class="mt-5 space-x-2 space-y-2 w-full items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-radio-group
      v-model="value"
      class="inline-flex"
      :options="options"
      :radio="true"
      :separated="true"
      :dark="isDark"
      layout="naked"
    />
  </div>
  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>
</template>

<script>
import { VanillaInputRadioGroup } from "@/index";
import { useDarkMode } from '@vuepress/theme-default/lib/client/composables/useDarkMode'
export default {
  name: "ExampleInputRichSelect",
  components: {
    VanillaInputRadioGroup
  },
  data(){
      return {
        value: null,
        value2: null,
        value3: null,
      }
  },
  computed: {
    isDark(){
      return useDarkMode().value
    },
    options(){
      return [
        {value: 'paypal', label: 'Paypal',description: 'Here you can pay with paypal'},
        {value: 'visa', label: 'Visa, Mastercard', description: 'Pay with your vista card & many more'},
        {
          value: [ { visa: true, master_card: true}],
          label: 'Yet, another complex Payment',
          description: 'Not sure how to pay? Click here'
        }
      ]
    }
  },
  mounted() {
    window.parent.postMessage('mounted', '*')
  }
}
</script>
