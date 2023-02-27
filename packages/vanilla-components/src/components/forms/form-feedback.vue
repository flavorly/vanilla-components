<script setup lang="ts">
import type { PropType } from 'vue'
import { useConfiguration, useVariantProps } from '../../core/use'
import type { FormClassesValidKeys, FormFeedbackProps } from './config'
import { formsConfig } from './config'

const props = defineProps({
  ...useVariantProps<FormFeedbackProps, FormClassesValidKeys>(),
  text: {
    type: [String, undefined] as PropType<string | undefined>,
    required: true,
  },
  safe: {
    type: [Boolean] as PropType<boolean>,
    default: true,
    required: false,
  },
})

const emit = defineEmits(['feedbackClick', 'click'])
const { configuration } = useConfiguration<FormFeedbackProps>(formsConfig, 'FormFeedback')

const clicked = () => {
  emit('feedbackClick', true)
  emit('click', true)
}

defineOptions({
  name: 'VanillaFormFeedback',
  inheritAttrs: true,
})

/**
 * @docs
 * @displayName VanillaFormFeedback
 * @description Display feedback for a form or a field
 **/
</script>

<template>
  <div
    v-if="text"
    :class="configuration.classesList.feedback"
    @click="clicked"
  >
    <span
      v-if="safe"
      v-html="text"
    />
    <span v-else>{{ text }}</span>
  </div>
</template>
