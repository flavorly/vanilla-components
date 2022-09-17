<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import type { VanillaFormFeedbackProps } from './index'
import { VanillaFormFeedbackConfig } from './index'
import { useBootVariant, useConfiguration, useVariantProps } from '@/core'

export default defineComponent({
    name: 'VanillaFormFeedback',
    inheritAttrs: false,
    props: {
        ...useVariantProps<VanillaFormFeedbackProps>(),
        text: {
            type: [String, undefined] as PropType<string | undefined>,
            required: true,
        },
        safe: {
            type: [Boolean] as PropType<boolean>,
            default: true,
            required: false,
        },
    },
    emits: ['feedbackClick', 'click'],
    setup(props, { emit }) {
        const { localVariant } = useBootVariant(props, '', ref(null))
        const { configuration } = useConfiguration<VanillaFormFeedbackProps>(VanillaFormFeedbackConfig)

        const clicked = () => {
            emit('feedbackClick', true)
            emit('click', true)
        }

        return {
            localVariant,
            configuration,
            clicked,
        }
    },
})
</script>

<template>
  <div
    v-if="text"
    :class="configuration.class"
    @click="clicked"
  >
    <span
      v-if="safe"
      v-html="text"
    />
    <span v-else>{{ text }}</span>
  </div>
</template>
