<script setup lang="ts">
import type { ComputedRef, Ref } from 'vue'
import { inject, nextTick, onMounted, ref, watch } from 'vue'
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

watch(() => shown.value, async (isShown: boolean): Promise<void> => {
  await nextTick(() => {
    if (shown.value) {
      search.value.focus({ preventScroll: true })
    }
  })

  if (shown.value) {
    search.value.focus({ preventScroll: true })
  }
})

onMounted(() => {
  search.value.focus({ preventScroll: true })
})
</script>

<template>
  <div :class="classesList.searchWrapper">
    <input
      ref="search"
      v-model="searchQuery"
      type="search"
      data-rich-select-focusable
      :placeholder="configuration.searchBoxPlaceholder"
      :class="classesList.searchInput"
      tabindex="1"
      @input="$event.target.composing = false"
      @keydown.down="keydownDownHandler"
      @keydown.up="keydownUpHandler"
      @keydown.enter="keydownEnterHandler"
      @keydown.esc="keydownEscHandler"
    >
  </div>
</template>
