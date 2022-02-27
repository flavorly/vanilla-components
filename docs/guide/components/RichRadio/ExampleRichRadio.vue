<template>
  <!-- Regular -->
  <VanillaRichRadio
    v-model="value"
    :options="options"
    :feedback="'Im useful helper out here, choose wisely'"
  />

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <div class="h-1 my-5" />

  <!-- Error -->
  <VanillaRichRadio
    v-model="value2"
    :options="options2"
    :feedback="'Im useful helper out here, choose wisely'"
    :errors="'Please select a valid option'"
  />

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value2) }}</pre>
  </div>
</template>


<script setup type="ts">
import { VanillaRichRadio } from '@/index';
import { onMounted, ref, defineComponent } from 'vue';
import { clone } from 'lodash';

defineComponent({ name: 'ExampleRichRadio' });
onMounted(() => window.parent.postMessage('mounted', '*'));

const options =  [
    { value: 'paypal', text: 'Paypal', description: 'Paypal is the most secure way to make purchases' },
    { value: 'visa', text: 'Visa, Master Card, Amex', description: 'Use your credit card with confidence via Stripe' },
    { value: 'wire', text: 'Wire Transfer', description: 'Not familiar? Lets make a wire.' },
    { value: 'disabled', text: 'Cash', description: 'Cash is temporary disabled', disabled: true },
];

const options2 = clone(options);

const value = ref('paypal');
const value2 = ref('wire');
</script>
