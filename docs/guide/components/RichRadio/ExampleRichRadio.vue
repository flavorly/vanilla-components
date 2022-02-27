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
    { value: 'Option 1', text: 'One Option', description: 'Im a description inside my option' },
    { value: 'Option 2', text: 'Two Options', description: 'Im a description inside my option' },
    { value: { nested: true, type: 'nested' }, text: 'Complex Object', description: 'Im a description inside my option' },
];

const value = ref(['Option 1']);
</script>
