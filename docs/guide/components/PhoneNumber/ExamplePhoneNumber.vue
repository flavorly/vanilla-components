<template>
  <div class="h-[500px]">
    <!-- Regular -->
    <!--    <VanillaPhoneNumber-->
    <!--      v-model="value"-->
    <!--      :country-code="valueCountry"-->
    <!--      :feedback="'Im useful helper out here, choose wisely'"-->
    <!--      placeholder="Elon Musk"-->
    <!--    />-->

    <!--    <div class="flex items-center justify-center mx-auto text-center mt-2">-->
    <!--      <pre>{{ JSON.stringify(value) }}</pre>-->
    <!--    </div>-->

    <!--    <div class="h-1 my-5" />-->

    <!-- Regular -->
    <VanillaPhoneNumber
      v-model="value"
      :country-code="valueCountry"
      :feedback="'Im useful helper out here, choose wisely'"
      :errors="'Sorry but your phone number looks to be invalid.'"
      placeholder="Elon Musk"
    />

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre>{{ JSON.stringify(value) }}</pre>
    </div>

    <div class="h-1 my-5" />
  </div>
</template>


<script setup type="ts">
import { VanillaPhoneNumber } from '@/index';
import { onMounted, ref, defineComponent } from 'vue';

defineComponent({ name: 'ExamplePhoneNumber' });
onMounted(() => window.parent.postMessage('mounted', '*'));

const value = ref('+351915279172');
const valueCountry = null;
</script>
