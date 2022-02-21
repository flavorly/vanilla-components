<template>
  <div class="h-[500px]">
    <!-- Regular -->
    <VanillaPhoneNumber
      v-model="value"
      :feedback="'Im useful helper out here, choose wisely'"
      placeholder="Elon Musk"
    />
  </div>
</template>


<script setup type="ts">
import { VanillaPhoneNumber } from '@/index';
import { onMounted, ref, defineComponent } from 'vue';

defineComponent({ name: 'ExamplePhoneNumber' });
onMounted(() => window.parent.postMessage('mounted', '*'));

const value = ref('PT');
</script>
