<script lang="ts">
import type { ComputedRef, Ref } from 'vue'
import { defineComponent, inject } from 'vue'
import type { VanillaRichSelectProps } from '../index'
import { useInjectsClassesList, useInjectsConfiguration } from '../../core'
import TextPlaceholder from '../misc/text-placeholder.vue'
import SelectorIcon from '../icons/selector.vue'
import LoadingIcon from '../icons/loading.vue'
import RichSelectTriggerTags from './trigger-tags.vue'
import type { NormalizedOption } from '@/core/types'

export default defineComponent({
    name: 'RichSelectTrigger',
    components: {
        RichSelectTriggerTags,
        TextPlaceholder,
        SelectorIcon,
        LoadingIcon,
    },
    setup() {
        const configuration = useInjectsConfiguration<VanillaRichSelectProps>()
        const selectedOption = inject<ComputedRef<NormalizedOption | undefined | NormalizedOption[]>>('selectedOption')!
        const hasSelectedOption = inject<ComputedRef<boolean>>('hasSelectedOption')!
        const fetchingOptions = inject<Ref<boolean>>('fetchingOptions')!
        const shown = inject<ComputedRef<boolean>>('shown')!
        const usesTags = inject<ComputedRef<boolean>>('usesTags')!
        const classesList = useInjectsClassesList()!

        return {
            selectedOption,
            hasSelectedOption,
            configuration,
            fetchingOptions,
            shown,
            usesTags,
            classesList,
        }
    },
    computed: {
        label(): string | undefined {
            if (!this.hasSelectedOption) {
                return undefined
            }

            if (this.multiple) {
                return (this.selectedOption as NormalizedOption[])
                    .map(o => o.text).join(', ')
            }

            return String((this.selectedOption as NormalizedOption).text)
        },
        isFetchingOptionsWhileClosed(): boolean {
            return this.fetchingOptions && !this.shown
        },
        multiple(): boolean {
            return Array.isArray(this.selectedOption)
        },
        showSelectorIcon(): boolean {
            if (this.isFetchingOptionsWhileClosed) {
                return false
            }

            if (!this.configuration.clearable) {
                return true
            }

            return !this.hasSelectedOption || this.configuration.disabled === true
        },
    },
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

  <RichSelectTriggerTags v-else-if="usesTags">
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
  </RichSelectTriggerTags>

  <span
    v-else
    ref="label"
    :class="classesList.selectButtonLabel"
  >
    <slot
      name="label"
      :label="label"
      :selected-option="selectedOption"
    >
      {{ label }}
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
