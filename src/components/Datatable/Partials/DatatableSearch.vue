<template>
  <div :class="[classesList.searchContainer]">
    <VanillaInput
      ref="search"
      v-model="localValue"
      name="search"
      :class="[
        classesList.searchInputClasses,
        !searchable ? classesList.genericForbidden : ''
      ]"
      :disabled="!searchable"
      :placeholder="placeholder"
      :variant="classesList.searchInputVariant"
      type="search"
    >
      <template #before>
        <SearchIcon
          :class="[classesList.searchIcon]"
        />
      </template>
    </VanillaInput>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useInjectsClassesList, useVModel } from '@/core';
import VanillaInput from '@/components/Input/Input.vue';
import { SearchIcon } from '@heroicons/vue/solid';

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
        const classesList = useInjectsClassesList('configuration_vanilla_datatable')!;
        return {
            localValue,
            classesList,
        };
    },
});
</script>
