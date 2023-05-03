<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import { useInjectsClassesList, useVModel } from '../../../core/use'
import Input from '../../input/input.vue'
import MagnifyingGlassIcon from '~icons/heroicons/magnifying-glass-solid'

const props = defineProps({
  modelValue: {
    type: [String, null, undefined] as PropType<string | null | undefined>,
    required: true,
  },
  placeholder: {
    type: [String] as PropType<string>,
    required: true,
  },
  searchable: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const search = ref<HTMLElement>()
const localValue = useVModel(props, 'modelValue')
const classesList = useInjectsClassesList('configuration_vanilla_datatable')!
</script>

<script lang="ts">
export default {
  name: 'VanillaDatatableSearchbar',
}
</script>

<template>
  <div :class="[classesList.searchContainer]">
    <Input
      ref="search"
      v-model.lazy="localValue"
      name="search"
      :class="[
        classesList.searchInputClasses,
        !searchable ? classesList.genericForbidden : '',
      ]"
      :placeholder="placeholder"
      :variant="classesList.searchInputVariant"
      type="search"
    >
      <template #before>
        <MagnifyingGlassIcon
          :class="[classesList.searchIcon]"
        />
      </template>
    </Input>
  </div>
</template>
