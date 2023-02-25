<script setup lang="ts">
import type { ComputedRef, Ref } from 'vue'
import { computed, inject } from 'vue'
import type { RichSelectProps } from '../config'
import { useInjectsClassesList, useInjectsConfiguration } from '../../../core/use'
import LoadingIcon from '../../icons/loading.vue'

const options = inject<ComputedRef<RichSelectProps>>('options')!
const fetchingOptions = inject<Ref<boolean>>('fetchingOptions')!
const needsMoreCharsToFetch = inject<Ref<boolean>>('needsMoreCharsToFetch')!
const needsMoreCharsMessage = inject<ComputedRef<string>>('needsMoreCharsMessage')!
const configuration = useInjectsConfiguration<RichSelectProps>()
const noResults = computed<boolean>((): boolean => options.value.length === 0)
const classesList = useInjectsClassesList()!
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
    >
      <LoadingIcon
        ref="loadingIcon"
        :class="classesList.selectButtonLoadingIcon"
      />
      <span>{{ configuration.searchingText }}</span>
    </div>
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
