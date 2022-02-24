<template>
  <!-- Regular -->
  <VanillaCheckbox
    v-model="value"
    :feedback="'Im useful helper out here, choose wisely'"
  />

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <VanillaCheckbox
    v-model="value2"
    :errors="'Sorry for this name is already taken'"
    :feedback="'I only show when i dont have errors'"
  />

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value2) }}</pre>
  </div>
</template>


<script setup type="ts">
import { VanillaCheckbox } from '@/index';
import { onMounted, ref, defineComponent } from 'vue';

defineComponent({ name: 'ExampleCheckbox' });
onMounted(() => window.parent.postMessage('mounted', '*'));

const value = ref('checked');
const value2 = ref('not-checked');
</script>
