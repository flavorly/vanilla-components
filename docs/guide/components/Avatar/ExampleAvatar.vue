<template>
  <!-- Regular -->
  <div class="text-center">
    <VanillaAvatar
      v-model="value"
      class="inline-flex"
      :feedback="'Im useful helper out here, choose wisely'"
      placeholder="Elon Musk"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <div class="text-center">
    <VanillaAvatar
      v-model="value2"
      placeholder="Type to clear errors"
      :errors="'Sorry for this name is already taken'"
      :feedback="'I only show when i dont have errors'"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value2) }}</pre>
  </div>
</template>


<script setup type="ts">
import { VanillaAvatar } from '@/index';
import { onMounted, ref, defineComponent } from 'vue';

defineComponent({ name: 'ExampleAvatar' });
onMounted(() => window.parent.postMessage('mounted', '*'));

const value = ref(null);
const value2 = ref(null);
</script>
