<script setup lang="ts">
import type { ComputedRef, Ref } from 'vue'
import { inject, ref, watch } from 'vue'
import type { RichSelectProps } from '../config'
import { useInjectsClassesList, useInjectsConfiguration } from '@/core/use'

const search = ref<HTMLInputElement>()
const shown = inject<ComputedRef<boolean>>('shown')!
const searchQuery = inject<Ref<string | undefined>>('searchQuery')!
const configuration = useInjectsConfiguration<RichSelectProps>()
const keydownDownHandler = inject<(e: KeyboardEvent) => void>('keydownDownHandler')
const keydownUpHandler = inject<(e: KeyboardEvent) => void>('keydownUpHandler')
const keydownEnterHandler = inject<(e: KeyboardEvent) => void>('keydownEnterHandler')
const keydownEscHandler = inject<(e: KeyboardEvent) => void>('keydownEscHandler')
const classesList = useInjectsClassesList()!

watch(shown, async (isShown: boolean): Promise<void> => {
    if (isShown) {
      search.value!.focus()
    }
})
</script>

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
