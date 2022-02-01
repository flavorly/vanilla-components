<template>
  <!-- Regular -->
  <div class="space-x-2 space-y-2 w-full items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-radio-group
      v-model="value"
      class="inline-flex"
      :options="options"
      layout="naked"
    />
  </div>
  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <!-- Separated -->
  <div class="mt-5 space-x-2 space-y-2 w-full items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-radio-group
      v-model="value2"
      class="inline-flex"
      :options="options"
      :separated="true"
      layout="naked"
    />
  </div>
  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <!-- Radio -->
  <div class="mt-5 space-x-2 space-y-2 w-full items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-radio-group
      v-model="value3"
      class="inline-flex"
      :options="options"
      :radio="true"
      :separated="true"
      layout="naked"
    />
  </div>
  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <!-- Compact -->
  <div class="mt-5 space-x-2 space-y-2 w-full items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-radio-group
      v-model="value3"
      class="inline-flex"
      :options="options"
      :radio="true"
      :separated="false"
      :compact="true"
      layout="naked"
    />
  </div>
  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <!-- Compact -->
  <div class="mt-5 space-x-2 space-y-2 w-full items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-radio-group
      v-model="value2"
      class="inline-flex"
      :options="options"
      :radio="true"
      :separated="false"
      :compact="true"
      layout="naked"
      :errors="'Yet another form with errors'"
    />
  </div>
  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <!-- Normal with Errors -->
  <div class="mt-5 space-x-2 space-y-2 w-full items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <vanilla-input-radio-group
      v-model="value2"
      class="inline-flex"
      :options="options"
      :separated="true"
      layout="naked"
      :errors="'Another errors can be here.'"
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
            value: 'paypal',
            value2: 'visa',
            value3: [ { visa: true, master_card: true}],
        }
    },
    computed: {
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
