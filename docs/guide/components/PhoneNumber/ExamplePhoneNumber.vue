<template>
  <div class="h-[500px]">
    <VanillaPhoneNumber
      v-model="value"
      :country-code="valueCountry"
      :feedback="'Im useful helper out here, choose wisely'"
      country-placeholder="Pick your phone country"
      phone-placeholder="National Number"
    />

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre>{{ JSON.stringify(value) }}</pre>
    </div>

    <div class="h-1 my-5" />

    <!-- Regular -->
    <VanillaPhoneNumber
      v-model="value2"
      :country-code="value2Country"
      :feedback="'Im useful helper out here, choose wisely'"
      :errors="errors"
      country-placeholder="Pick your phone country"
      phone-placeholder="National Number"
    />

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre>{{ JSON.stringify(value2) }}</pre>
    </div>

    <button
      class="px-3 py-2 border bg-white"
      @click="clearErrors"
    >
      Clear Errors
    </button>
    <button
      class="px-3 py-2 border bg-white"
      @click="addErrors"
    >
      Add Errors
    </button>

    <div class="h-1 my-5" />
  </div>
</template>


<script setup type="ts">
import { VanillaPhoneNumber } from '@/index';
import { onMounted, ref, defineComponent, nextTick } from 'vue';

defineComponent({ name: 'ExamplePhoneNumber' });
onMounted(() => window.parent.postMessage('mounted', '*'));

const value = ref('+35191523813');
const valueCountry = 'PT';

const value2 = ref('915279172');
const value2Country = 'PT';

const errors = ref('Sorry but your phone number looks to be invalid.');

const clearErrors = () => {
    errors.value = undefined;
};

const addErrors = () => {
    clearErrors();
    nextTick(() => {
        errors.value = 'Sorry but your phone number looks to be invalid.';
    });

};
</script>
