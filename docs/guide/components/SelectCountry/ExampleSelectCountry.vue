<template>
  <div class="h-[500px]">
    <!-- Regular -->
    <VanillaSelectCountry
      v-model="value"
      class="inline-flex"
      :feedback="'Im useful helper out here, choose wisely'"
      placeholder="Elon Musk"
    />

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre>{{ JSON.stringify(value) }}</pre>
    </div>
  </div>
</template>


<script setup type="ts">
import { VanillaSelectCountry } from '@/index';
import { onMounted, ref, defineComponent } from 'vue';

defineComponent({ name: 'ExampleSelectCountry' });
onMounted(() => window.parent.postMessage('mounted', '*'));

const value = ref('PT');
const value2 = ref(null);
</script>
