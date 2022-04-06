<template>
  <VanillaButton label="Open Slideover" @click="open = !open"/>
  <div class="h-[320px]">
    <VanillaSlideover
      v-model="open"
      title="Payments"
      subtitle="Want to create new payments? Worry not, this a demo payment slideover"
    >
      <div class="absolute inset-0 px-4 sm:px-6">
        <div class="h-full border-2 border-dashed border-gray-200" aria-hidden="true" />
      </div>
    </VanillaSlideover>
  </div>
</template>


<script setup type="ts">
import {
		VanillaSlideover,
		VanillaButton,
} from '@indigit/vanilla-components';
import { defineComponent, ref } from 'vue';

defineComponent({ name: 'ExampleSlideover' });

const open = ref(false)
</script>
