<template>
  <slot
    name="stateFeedback"
    :fetching-options="fetchingOptions"
    :needs-more-chars-to-fetch="needsMoreCharsToFetch"
    :no-results="noResults"
  >
    <div
      v-if="fetchingOptions"
      :class="classesList.searchingText"
      v-text="configuration.searchingText"
    />
    <div
      v-else-if="needsMoreCharsToFetch"
      :class="classesList.needsMoreCharsText"
      v-text="needsMoreCharsMessage"
    />
    <div
      v-else-if="noResults"
      :class="classesList.noResultsText"
      v-text="configuration.noResultsText"
    />
  </slot>
</template>

<script lang="ts">
import {
    computed,
    ComputedRef,
    defineComponent,
    inject, ref,
    Ref,
} from 'vue';
import { VanillaRichSelectProps } from '@/components/RichSelect/Type';
import { useBootVariant, useConfigurationWithClassesList, useInjectsClassesList } from '@/core/use';
import { useInjectsConfiguration } from '@/core/use';
import {
    VanillaRichSelectStateClassesKeys,
    VanillaRichSelectStateConfig,
    VanillaRichSelectStateProps,
} from '@/components/RichSelect/RichSelectState/index';

export default defineComponent({
    name: 'VanillaRichSelectState',
    compatConfig: {
        MODE: 3,
    },
    setup(props) {
        const options = inject<ComputedRef<VanillaRichSelectProps>>('options')!;
        const fetchingOptions = inject<Ref<boolean>>('fetchingOptions')!;
        const needsMoreCharsToFetch = inject<Ref<boolean>>('needsMoreCharsToFetch')!;
        const needsMoreCharsMessage = inject<ComputedRef<string>>('needsMoreCharsMessage')!;
        const configuration = useInjectsConfiguration<VanillaRichSelectProps>();
        const noResults = computed<boolean>((): boolean => options.value.length === 0);
        const classesList = useInjectsClassesList()!;

        const {
            localVariant,
        } = useBootVariant(props, 'errors', ref(null));

        const { configuration: ownConfiguration  } = useConfigurationWithClassesList<VanillaRichSelectStateProps>(
            VanillaRichSelectStateConfig,
            VanillaRichSelectStateClassesKeys,
            localVariant,
        );

        return {
            noResults,
            configuration,
            fetchingOptions,
            needsMoreCharsToFetch,
            needsMoreCharsMessage,
            classesList,
            ownConfiguration,
        };
    },
});
</script>
