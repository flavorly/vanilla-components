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
import { SearchIcon } from '@heroicons/vue/solid';
import debounce from 'lodash/debounce';
import VanillaInput from '@/components/Input/Input.vue';

export default defineComponent({
    name: 'VanillaDatatableSearch',
    components: {
        VanillaInput,
        SearchIcon,
    },
    props: {
        query: {
            type: [String, null, undefined] as PropType<string>,
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
        'search',
    ],
    setup(props, { emit }){

        const searchQuery = ref(props.query);

        watch(searchQuery, debounce(function (query: string | null){
            // Only search if we're not tabbing into the field
            if (props.searchable) {
                console.log('searching', query);
                emit('search', query);
            }
        }, 700));

        watch(() => props.query, () => {
            searchQuery.value = props.query;
        });

        return {
            searchQuery,
        };
    },
});
</script>
