<template>
  <div class="px-5 mt-3 mb-3">
    <VanillaInput
      ref="search"
      v-model="localValue"
      name="search"
      :class="{'cursor-not-allowed': !searchable}"
      :disabled="!searchable"
      :placeholder="placeholder"
      variant="compact"
      type="search"
    >
      <template #before>
        <SearchIcon class="-mr-2 h-4 w-4 text-gray-400" />
      </template>
    </VanillaInput>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SearchIcon } from '@heroicons/vue/solid';
import VanillaInput from '@/components/Input/Input.vue';
import { useVModel } from '@/core';

export default defineComponent({
    name: 'VanillaDatatableSearch',
    components: {
        VanillaInput,
        SearchIcon,
    },
    props: {
        modelValue: {
            type: [String, null, undefined] as PropType<string | null | undefined>,
            required: true,
        },
        placeholder: {
            type: [String] as PropType<string>,
            required: true,
        },
        searchable: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
    },
    emits: [
        'update:modelValue',
    ],
    setup(props){
        const localValue = useVModel(props, 'modelValue');
        return {
            localValue,
        };
    },
});
</script>
