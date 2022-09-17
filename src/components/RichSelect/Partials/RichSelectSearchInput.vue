<template>
  <div :class="classesList.searchWrapper">
    <input
      ref="search"
      v-model="searchQuery"
      data-rich-select-focusable
      :placeholder="configuration.searchBoxPlaceholder"
      :class="classesList.searchInput"
      @keydown.down="keydownDownHandler"
      @keydown.up="keydownUpHandler"
      @keydown.enter="keydownEnterHandler"
      @keydown.esc="keydownEscHandler"
    >
  </div>
</template>

<script lang="ts">
import { ComputedRef, defineComponent, inject, watch, ref, Ref } from 'vue';
import { VanillaRichSelectProps } from '@/components/RichSelect';
import { useInjectsClassesList, useInjectsConfiguration } from '@/core';

export default defineComponent({
    name: 'RichSelectSearchInput',
    setup() {
        const search = ref<HTMLInputElement>();
        const shown = inject<ComputedRef<boolean>>('shown')!;
        const searchQuery = inject<Ref<string | undefined>>('searchQuery')!;
        const configuration = useInjectsConfiguration<VanillaRichSelectProps>();
        const keydownDownHandler = inject<(e: KeyboardEvent) => void>('keydownDownHandler');
        const keydownUpHandler = inject<(e: KeyboardEvent) => void>('keydownUpHandler');
        const keydownEnterHandler = inject<(e: KeyboardEvent) => void>('keydownEnterHandler');
        const keydownEscHandler = inject<(e: KeyboardEvent) => void>('keydownEscHandler');
        const classesList = useInjectsClassesList()!;

        watch(shown, async (isShown: boolean) : Promise<void> => {
            if (isShown) {
                search.value!.focus();
            }
        });

        return {
            configuration,
            shown,
            search,
            searchQuery,
            classesList,
            keydownUpHandler,
            keydownDownHandler,
            keydownEnterHandler,
            keydownEscHandler,
        };
    },
});
</script>
