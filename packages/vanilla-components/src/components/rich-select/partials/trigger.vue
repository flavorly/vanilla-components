<script setup lang="ts">
import type { ComputedRef, Ref } from 'vue'
import { computed, inject, ref } from 'vue'
import type { RichSelectProps } from '../config'
import SelectTriggerTags from './trigger-tags.vue'
import { useInjectsClassesList, useInjectsConfiguration } from '@/core/use'
import TextPlaceholder from '@/components/misc/text-placeholder.vue'
import SelectorIcon from '@/components/icons/selector.vue'
import LoadingIcon from '@/components/icons/loading.vue'
import type { NormalizedOption } from '@/core/types'

const props = defineProps({})
const configuration = useInjectsConfiguration<RichSelectProps>()
const selectedOption = inject<ComputedRef<NormalizedOption | undefined | NormalizedOption[]>>('selectedOption')!
const hasSelectedOption = inject<ComputedRef<boolean>>('hasSelectedOption')!
const fetchingOptions = inject<Ref<boolean>>('fetchingOptions')!
const shown = inject<ComputedRef<boolean>>('shown')!
const usesTags = inject<ComputedRef<boolean>>('usesTags')!
const classesList = useInjectsClassesList()!

// Template refs
const fetchingPlaceholder = ref()
const loadingIcon = ref()
const placeholder = ref()
const label = ref()
const selectorIcon = ref()

// Computed
const multiple = computed(() => Array.isArray(selectedOption.value))

const triggerLabel = computed((): string | undefined => {
  if (!hasSelectedOption.value) {
    return undefined
  }

  if (multiple.value) {
    return (selectedOption.value as NormalizedOption[]).map(o => o.text).join(', ')
  }

  return String((selectedOption.value as NormalizedOption).text)
})

const isFetchingOptionsWhileClosed = computed(() => fetchingOptions.value && !shown.value)

const showSelectorIcon = computed((): boolean => {
  if (isFetchingOptionsWhileClosed.value) {
    return false
  }

  if (!configuration.clearable) {
    return true
  }

  return !hasSelectedOption || configuration.disabled === true
})
</script>

<template>
  <slot
    v-if="isFetchingOptionsWhileClosed || !hasSelectedOption"
    name="placeholder"
    :is-fetching-options-while-closed="isFetchingOptionsWhileClosed"
  >
    <template v-if="isFetchingOptionsWhileClosed">
      <TextPlaceholder
        ref="fetchingPlaceholder"
        class-property="selectButtonSearchingPlaceholder"
        :placeholder="configuration.loadingClosedPlaceholder"
      />
      <LoadingIcon
        ref="loadingIcon"
        :class="classesList.selectButtonLoadingIcon"
      />
    </template>

    <TextPlaceholder
      v-else
      ref="placeholder"
      class-property="selectButtonPlaceholder"
      :placeholder="configuration.placeholder"
    />
  </slot>

  <SelectTriggerTags v-else-if="usesTags">
    <template #tagCloseIcon="props">
      <slot
        name="tagCloseIcon"
        v-bind="props"
      />
    </template>
    <template #tagLabel="props">
      <slot
        name="tagLabel"
        v-bind="props"
      />
    </template>
  </SelectTriggerTags>

  <span
    v-else
    ref="label"
    :class="classesList.selectButtonLabel"
  >
    <slot
      name="label"
      :label="triggerLabel"
      :option="selectedOption"
    >
      {{ triggerLabel }}
    </slot>
  </span>

  <slot
    v-if="showSelectorIcon"
    name="selectorIcon"
  >
    <SelectorIcon
      ref="selectorIcon"
      :class="classesList.selectButtonSelectorIcon"
    />
  </slot>
</template>
