<script setup lang="ts">
import type { PropType } from 'vue'
import { useConfiguration, useVariantProps } from '../../core/use'
import type { FormClassesValidKeys, FormSectionProps } from './config'
import { formsConfig } from './config'

const props = defineProps({
  ...useVariantProps<FormSectionProps, FormClassesValidKeys>(),
  divided: {
    type: [Boolean] as PropType<boolean>,
    default: false,
    required: false,
  },
  as: {
    type: [String] as PropType<string>,
    default: 'div',
    required: false,
  },
  spaced: {
    type: [Boolean] as PropType<boolean>,
    default: false,
    required: false,
  },
  filled: {
    type: [Boolean] as PropType<boolean>,
    default: false,
    required: false,
  },
})

const { configuration } = useConfiguration<FormSectionProps>(formsConfig, 'FormSection')

/**
 * @docs
 * @displayName VanillaFormSection
 * @description Form section
 **/
</script>

<script lang="ts">
export default {
  name: 'VanillaFormSection',
  inheritAttrs: true,
}
</script>

<template>
  <component
    :is="props.as"
    class="form-section"
    :class="[
      props.filled ? configuration.classesList.sectionFilled : '',
      props.divided ? configuration.classesList.sectionDivided : '',
      props.spaced ? configuration.classesList.sectionSpaced : '',
    ]"
  >
    <slot />
  </component>
</template>
