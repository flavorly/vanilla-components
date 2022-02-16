<template>
  <div class="h-60">
    <!-- Regular -->
    <VanillaRichSelect
      v-model="value"
      :feedback="'Im useful helper out here, choose wisely'"
      :options="options"
      placeholder="Elon Musk"
    >
      <template #option="{ option, className, isSelected }">
        <div :class="className">
          {{ option }}
        </div>
      </template>
    </VanillaRichSelect>
  </div>
  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>
</template>


<script setup type="ts">
import { VanillaRichSelect } from '@/index';
import { onMounted, ref, defineComponent } from 'vue';

defineComponent({ name: 'ExampleRichSelect' });
onMounted(() => window.parent.postMessage('mounted', '*'));

const value = ref(null);

const options = [
    { value: 'Option 1', text: 'One Option' },
    { value: 'Option 2', text: 'Two Options' },
    { value: { nested: true, type: 'nested' }, text: 'Complex Object' },
];
</script>
