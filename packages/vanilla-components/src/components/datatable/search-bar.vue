<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useInjectsClassesList, useVModel } from '../../core'
import VanillaInput from '../input/input.vue'
import MagnifyingGlassIcon from '../icons/hero/solid/MagnifyingGlassIcon.vue'

export default defineComponent({
    components: {
        VanillaInput,
        MagnifyingGlassIcon,
    },
    props: {
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
    },
    emits: [
        'update:modelValue',
    ],
    setup(props) {
        const localValue = useVModel(props, 'modelValue')
        const classesList = useInjectsClassesList('configuration_vanilla_datatable')!
        return {
            localValue,
            classesList,
        }
    },
})
</script>

<template>
  <div :class="[classesList.searchContainer]">
    <VanillaInput
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
    </VanillaInput>
  </div>
</template>
