<script setup lang="ts">
import type { PropType, Ref } from 'vue'
import { computed, inject, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { RichSelectProps } from '../config'
import { useInjectsClassesList } from '../../../core/use'
import { debounce, normalizeMeasure } from '../../../core/helpers'
import type { NormalizedOptions } from '../../../core/types'
import LoadingIcon from '../../icons/loading.vue'
import SelectOption from './option.vue'

const props = defineProps({
  options: {
    type: Array as PropType<NormalizedOptions>,
    required: true,
  },
  deep: {
    type: Number,
    default: 0,
  },
})

// Injected
const configuration = inject<RichSelectProps>('configuration_vanilla')!
const shown = inject<Ref<boolean>>('shown')
const fetchingMoreOptions = inject<Ref<boolean>>('fetchingMoreOptions')!
const dropdownBottomReachedHandler = inject<(() => void)>('dropdownBottomReachedHandler')!
const classesList = useInjectsClassesList()

// Template Refs
const root = ref<null | HTMLLIElement>(null)
const fetchingMoreOptionsText = ref<null | HTMLLIElement>(null)

// Computed
const maxHeight = computed(() => normalizeMeasure(configuration.maxHeight))
const usesMaxHeight = computed((): boolean => props.deep === 0 && maxHeight.value !== undefined)
const showOptions = computed<boolean>((): boolean => props.options.length > 0)

const bottomReachedObserver = debounce(([event]: [Event]) => {
  const element = event.target as HTMLUListElement
  const reached: boolean = Math.ceil(element.scrollHeight - element.scrollTop) === element.clientHeight

  if (reached) {
    dropdownBottomReachedHandler()
  }
}, 200)

// Watchers
watch(() => showOptions.value, async (shouldShow: boolean) => {
  if (shouldShow) {
    await nextTick
    root.value!.addEventListener('scroll', bottomReachedObserver)
  }
  else {
    root.value!.removeEventListener('scroll', bottomReachedObserver)
  }
})

watch(() => fetchingMoreOptions.value, async (isFetching: boolean) => {
  if (isFetching) {
    await nextTick
    const el = fetchingMoreOptionsText.value! as HTMLLIElement

    // TODO: check this
    if (el) {
      el.scrollIntoView({ block: 'end', behavior: 'smooth' })
    }
  }
})

onMounted(() => {
  if (showOptions.value) {
    root.value!.addEventListener('scroll', bottomReachedObserver)
  }
})

onBeforeUnmount(() => {
  if (showOptions.value) {
    root.value!.removeEventListener('scroll', bottomReachedObserver)
  }
})
</script>

<template>
  <ul
    v-if="showOptions"
    ref="root"
    :class="classesList.optionsList"
    :style="usesMaxHeight ? `max-height: ${maxHeight}; overflow-x: auto;` : undefined"
  >
    <SelectOption
      v-for="(option, index) in options"
      :key="`${deep > 0 ? `${deep}-` : ''}${JSON.stringify(option.value)}-${index}`"
      :option="option"
      :deep="deep"
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
    </SelectOption>

    <li
      v-if="fetchingMoreOptions"
      ref="fetchingMoreOptionsText"
      key="loading_more"
      :class="classesList.optionsListLoadingMore"
    >
      <LoadingIcon
        ref="loadingIcon"
        :class="classesList.selectButtonLoadingIcon"
      />
      <span>{{ configuration.loadingMoreResultsText }}</span>
    </li>
  </ul>
</template>
