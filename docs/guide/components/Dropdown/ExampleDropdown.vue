<template>
  <div class="h-[1000px]">
    <!-- Regular -->
    <VanillaDropdown
      v-model="value"
      class="inline-flex"
      text="Im a Trigger"
    >
      <template #default>
        Im the content
      </template>
    </VanillaDropdown>

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre>{{ JSON.stringify(value) }}</pre>
    </div>
  </div>
</template>


<script setup type="ts">
import { VanillaDropdown } from '@/index';
import { onMounted, ref, defineComponent } from 'vue';

defineComponent({ name: 'ExampleDropdown' });
onMounted(() => window.parent.postMessage('mounted', '*'));

const value = ref(true);
</script>
