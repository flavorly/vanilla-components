<template>
  <div class="h-[1000px]">
    <div class="flex items-center justify-center mx-auto">
      <!-- Regular -->
      <VanillaDropdown
        v-model="value"
        text="Options"
      />
    </div>

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
