<template>
  <!-- Regular -->
  <VanillaInput
    v-model="value"
    class="inline-flex"
    :feedback="'Im useful helper out here, choose wisely'"
    placeholder="Elon Musk"
  />

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <VanillaInput
    v-model="value2"
    placeholder="Type to clear errors"
    :errors="'Sorry for this name is already taken'"
    :feedback="'I only show when i dont have errors'"
  />

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value2) }}</pre>
  </div>

  <VanillaInput
    v-model="valuePassword"
    placeholder="Write your secure password here"
    :feedback="'The password must have XYZ characters and one symbol'"
    type="password"
  />

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(valuePassword) }}</pre>
  </div>
</template>


<script setup type="ts">
import { VanillaInput } from '@/index';
import { onMounted, ref, defineComponent } from 'vue';

defineComponent({ name: 'ExampleInputText' });
onMounted(() => window.parent.postMessage('mounted', '*'));

const value = ref(null);
const value2 = ref(null);
const valuePassword = ref(null);
</script>
