<script lang="ts">
import type { ComputedRef } from 'vue'
import { defineComponent, inject } from 'vue'
import RichSelectOptionsList from './RichSelectOptionsList.vue'
import RichSelectSearchInput from './RichSelectSearchInput.vue'
import RichSelectState from './RichSelectState.vue'
import type { NormalizedOptions } from '../../../core/types'
import { useInjectsClassesListClass } from '../../../core'

export default defineComponent({
    name: 'RichSelectDropdown',
    components: {
        RichSelectOptionsList,
        RichSelectSearchInput,
        RichSelectState,
    },
    setup() {
        const options = inject<ComputedRef<NormalizedOptions>>('options')!
        const showSearchInput = inject<ComputedRef<boolean>>('showSearchInput')!
        const className = useInjectsClassesListClass('dropdownContent')

        return {
            options,
            showSearchInput,
            className,
        }
    },
})
</script>

<template>
  <div :class="className">
    <RichSelectSearchInput
      v-if="showSearchInput"
      ref="searchInput"
    />

    <slot name="dropdownTop" />

    <RichSelectState ref="state">
      <template #stateFeedback="props">
        <slot
          name="stateFeedback"
          v-bind="props"
        />
      </template>
    </RichSelectState>

    <RichSelectOptionsList
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
    </RichSelectOptionsList>

    <slot name="dropdownButton" />
  </div>
</template>
