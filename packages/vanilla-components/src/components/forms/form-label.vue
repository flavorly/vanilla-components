<script setup lang="ts">
import type { PropType } from 'vue'
import { useConfiguration, useVariantProps } from '../../core/use'
import type { FormClassesValidKeys, FormLabelProps } from './config'
import { formsConfig } from './config'

const props = defineProps({
  ...useVariantProps<FormLabelProps, FormClassesValidKeys>(),
  label: {
    type: [String] as PropType<string>,
    required: true,
  },
  for: {
    type: [String, undefined] as PropType<string | undefined>,
    default: undefined,
    required: false,
  },
  safe: {
    type: [Boolean] as PropType<boolean>,
    default: true,
    required: false,
  },
  as: {
    type: [String] as PropType<string>,
    default: 'label',
    required: false,
  },
})
const { configuration } = useConfiguration<FormLabelProps>(formsConfig, 'FormLabel')

/**
 * @docs
 * @displayName VanillaFormLabel
 * @description Display a label for a form or a field
 **/
</script>

<script lang="ts">
export default {
  name: 'VanillaFormLabel',
  inheritAttrs: true,
}
</script>

<template>
  <component
    :is="as"
    :for="props.for"
    :class="configuration.classesList.label"
  >
    <slot name="before" />
    <slot>
      <span
        v-if="safe"
        v-html="label"
      />
      <span
        v-else
        v-text="label"
      />
    </slot>
    <slot name="after" />
  </component>
</template>
