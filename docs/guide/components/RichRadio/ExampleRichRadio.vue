<template>
  <!-- Regular -->
  <VanillaRichRadio
    v-model="value"
    :options="options"
    :feedback="'Im useful helper out here, choose wisely'"
    placeholder="Elon Musk"
  />

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>
</template>


<script setup type="ts">
import { VanillaRichRadio } from '@/index';
import { onMounted, ref, defineComponent } from 'vue';

defineComponent({ name: 'ExampleRichRadio' });
onMounted(() => window.parent.postMessage('mounted', '*'));

const options =  [
    { value: 'paypal', text: 'Paypal', description: 'Paypal is the most secure way to make purchases' },
    { value: 'visa', text: 'Visa, Master Card, Amex', description: 'Use your credit card with confidence via Stripe' },
    { value: 'wire', text: 'Wire Transfer', description: 'Not familiar? Lets make a wire.' },
];

const value = ref('paypal');
</script>
