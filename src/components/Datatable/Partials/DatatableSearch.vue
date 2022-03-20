<template>
  <div class="px-5 mt-3 mb-3">
    <VanillaInput
      ref="search"
      v-model="searchQuery"
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
import { defineComponent, PropType, ref, watch } from 'vue';
import { VanillaInput } from '@/index';
import { SearchIcon } from '@heroicons/vue/solid';
import debounce from 'lodash/debounce';

export default defineComponent({
    name: 'VanillaDatatableSearch',
    components: {
        VanillaInput,
        SearchIcon,
    },
    props: {
        placeholder: {
            type: [String] as PropType<string>,
            required: true,
        },
        searchable: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
        initialSearchQuery: {
            type: [String, undefined] as PropType<string | undefined>,
            required: false,
            default: null,
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }){

        const searchQuery = ref(props.initialSearchQuery);

        watch(searchQuery, debounce(function (query){
            // Only search if we're not tabbing into the field
            if (props.searchable) {
                emit('update:modelValue', query);
            }
        }, 700));

        return {
            searchQuery,
        };
    },
});
</script>
