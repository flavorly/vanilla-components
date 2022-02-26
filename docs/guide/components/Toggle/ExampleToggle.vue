<template>
  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <!-- Regular -->
    <VanillaToggle
      v-model="value"
      :value="'accepted'"
      :checked-value="'accepted'"
      :unchecked-value="'notAccepted'"
      :feedback="'Im useful helper out here, choose wisely'"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <div class="h-1 my-5" />

  <div class="flex items-center justify-center mx-auto text-center mt-2 space-x-2">
    <!-- Regular -->
    <VanillaToggle
      v-model="valueMultiple"
      :value="'oranges'"
      :checked-value="'oranges'"
    />
    <!-- Regular -->
    <VanillaToggle
      v-model="valueMultiple"
      :value="'bananas'"
      :checked-value="'bananas'"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(valueMultiple) }}</pre>
  </div>

  <div class="h-1 my-5" />

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <!-- Regular -->
    <VanillaToggle
      v-model="value2"
      :errors="'Sorry please check again'"
      :value="'accepted'"
      :checked-value="true"
      :unchecked-value="false"
      :feedback="'Im useful helper out here, choose wisely'"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value2) }}</pre>
  </div>
</template>


<script setup type="ts">
import { VanillaToggle } from '@/index';
import { onMounted, ref, defineComponent } from 'vue';

defineComponent({ name: 'ExampleToggle' });
onMounted(() => window.parent.postMessage('mounted', '*'));

const value = ref('accepted');
const value2 = ref(false);
const valueMultiple = ref([]);
</script>
