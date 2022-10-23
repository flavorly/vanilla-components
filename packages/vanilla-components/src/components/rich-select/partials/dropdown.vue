<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { inject, ref } from 'vue'
import OptionsList from './option-list.vue'
import SearchInput from './search.vue'
import SelectState from './state.vue'
import { useInjectsClassesListClass } from '@/core/use'
import type { NormalizedOptions } from '@/core/types'

const searchInput = ref()
const optionsList = ref()
const state = ref()

const options = inject<ComputedRef<NormalizedOptions>>('options')!
const showSearchInput = inject<ComputedRef<boolean>>('showSearchInput')!
const className = useInjectsClassesListClass('dropdownContent')
</script>

<template>
  <div :class="className">
    <SearchInput
      v-if="showSearchInput"
      ref="searchInput"
    />

    <slot name="dropdownTop" />

    <SelectState ref="state">
      <template #stateFeedback="props">
        <slot
          name="stateFeedback"
          v-bind="props"
        />
      </template>
    </SelectState>

    <OptionsList
      ref="optionsList"
      :options="options"
    >
      <template #option="props">
        <slot
          name="option"
          v-bind="props"
        />
      </template>
      <template #optionLabel="props">
        <slot
          name="optionLabel"
          v-bind="props"
        />
      </template>
      <template #optionIcon="props">
        <slot
          name="optionIcon"
          v-bind="props"
        />
      </template>
    </OptionsList>

    <slot name="dropdownBottom" />
  </div>
</template>
