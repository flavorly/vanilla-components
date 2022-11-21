<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { NormalizedOption } from '@/core/types'
import { useInjectsClassesList } from '@/core/use'
import SelectOption from '@/components/select/option.vue'

const props = defineProps({
    option: {
      type: [Object] as PropType<NormalizedOption>,
      required: true,
    },
    safe: {
      type: [Boolean] as PropType<boolean>,
      default: false,
    },
})

const classesList = useInjectsClassesList()!
const hasChildren = computed(() => props.option.children !== undefined && props.option.children.length > 0)

defineOptions({
  name: 'VanillaSelectOption',
})
</script>

<template>
  <optgroup
    v-if="hasChildren"
    :data-value="option.value !== undefined ? String(option.value) : undefined"
    :label="option.text !== undefined ? String(option.text) : undefined"
    :disabled="!!option.disabled"
    :class="classesList.optgroupLabel"
  >
    <SelectOption
      v-for="(childrenOption, index) in option.children"
      :key="`${childrenOption.value}-${childrenOption.text}-${index}`"
      :option="childrenOption"
      :class="classesList.optGroup"
    />
  </optgroup>
  <option
    v-else
    :value="option.value === null ? undefined : option.value"
    :disabled="!!option.disabled"
    :class="classesList.optGroup"
    v-text="option.text"
  />
</template>
