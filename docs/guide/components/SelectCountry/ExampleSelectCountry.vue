<template>
  <div class="h-[500px]">
    <!-- Regular -->
    <VanillaSelectCountry
      v-model="value"
      v-model:countryCode="valueCountryCode"
      v-model:countryDialCode="valueCountryDialCode"
      v-model:countryName="valueCountryName"
      :feedback="'Im useful helper out here, choose wisely'"
      placeholder="Elon Musk"
    />

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre>{{ JSON.stringify({ countryCode: valueCountryCode, countryDialCode: valueCountryDialCode, countryName: valueCountryName }, null, 2) }}</pre>
    </div>

    <div class="h-1 my-5" />

    <!-- With Errors -->
    <VanillaSelectCountry
      v-model="value2"
      placeholder="Please select your country"
      :feedback="'Im useful helper out here, choose wisely'"
      :errors="'Sorry but this country is not allowed.'"
    />

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre>{{ JSON.stringify(value2, null, 2) }}</pre>
    </div>
  </div>
</template>


<script setup type="ts">
import { VanillaSelectCountry } from '@/index';
import { onMounted, ref, defineComponent } from 'vue';

defineComponent({ name: 'ExampleSelectCountry' });
onMounted(() => window.parent.postMessage('mounted', '*'));

const value = ref('PT');
const value2 = ref('US');
const valueCountryCode = ref(null);
const valueCountryDialCode = ref(null);
const valueCountryName = ref(null);
</script>
