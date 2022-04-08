<template>
  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <!-- Regular -->
    <VanillaCheckbox
      v-model="value"
      :value="'accepted'"
      :checked-value="'accepted'"
      :unchecked-value="'notAccepted'"
      :feedback="'Im useful helper out here, choose wisely'"
      align="center"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <div class="h-1 my-5" />

  <div class="flex items-center justify-center space-x-2">
    <!-- Multiple -->
    <VanillaCheckbox
      v-model="valueMultiple"
      :value="'accepted'"
      :checked-value="'accepted'"
      :unchecked-value="'notAccepted'"
      class="inline-flex"
    />

    <VanillaCheckbox
      v-model="valueMultiple"
      :value="'accepted2'"
      :checked-value="'accepted2'"
      :unchecked-value="'notAccepted2'"
      class="inline-flex"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(valueMultiple) }}</pre>
  </div>

  <div class="h-1 my-5" />

  <!-- Errors -->
  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <VanillaCheckbox
      v-model="value2"
      :errors="'Sorry for this name is already taken'"
      :feedback="'I only show when i dont have errors'"
      align="center"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value2) }}</pre>
  </div>
</template>


<script setup type="ts">
import { VanillaCheckbox } from '@indigit/vanilla-components';
import { ref, defineComponent } from 'vue';

defineComponent({ name: 'ExampleCheckbox' });

const value = ref('accepted');
const value2 = ref(true);
const valueMultiple = ref([]);
</script>
