<script setup lang="ts">
import type { PropType } from 'vue'
import Input from '@/components/input/input.vue'
import MagnifyingGlassIcon from '@/components/icons/hero/solid/MagnifyingGlassIcon.vue'
import { useInjectsClassesList, useVModel } from '@/core/use'

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

const localValue = useVModel(props, 'modelValue')
const classesList = useInjectsClassesList('configuration_vanilla_datatable')!
</script>

<template>
  <div :class="[classesList.searchContainer]">
    <Input
      ref="search"
      v-model="localValue"
      name="search"
      :class="[
        classesList.searchInputClasses,
        !searchable ? classesList.genericForbidden : '',
      ]"
      :disabled="!searchable"
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
