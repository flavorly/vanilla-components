<template>
  <div class="flex items-center justify-center text-center px-6 py-8 rounded-lg">
    <div class="text-sm w-full">
      <slot />
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { useInjectsClassesList } from '@/core';

export default defineComponent({
    name: 'VanillaCardEmpty',
    compatConfig: {
        MODE: 3,
    },
    setup(props){

        const classesList = useInjectsClassesList()!;

        return {
            classesList,
            props,
        };
    },
});
</script>
