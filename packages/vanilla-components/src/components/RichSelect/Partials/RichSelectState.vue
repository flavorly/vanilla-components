<script lang="ts">
import type { ComputedRef, Ref } from 'vue'
import { computed, defineComponent, inject } from 'vue'
import type { VanillaRichSelectProps } from '../index'
import { useInjectsClassesList, useInjectsConfiguration } from '../../../core'

export default defineComponent({
    name: 'RichSelectState',
    setup() {
        const options = inject<ComputedRef<VanillaRichSelectProps>>('options')!
        const fetchingOptions = inject<Ref<boolean>>('fetchingOptions')!
        const needsMoreCharsToFetch = inject<Ref<boolean>>('needsMoreCharsToFetch')!
        const needsMoreCharsMessage = inject<ComputedRef<string>>('needsMoreCharsMessage')!
        const configuration = useInjectsConfiguration<VanillaRichSelectProps>()
        const noResults = computed<boolean>((): boolean => options.value.length === 0)
        const classesList = useInjectsClassesList()!

        return {
            noResults,
            configuration,
            fetchingOptions,
            needsMoreCharsToFetch,
            needsMoreCharsMessage,
            classesList,
        }
    },
})
</script>

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
