<template>
  <div
    v-if="text"
    :class="configuration.class"
    @click="$emit('feedbackClick')"
  >
    <span
      v-if="safe"
      v-html="text"
    />
    <span v-else>{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { useBootVariant, useVariantProps, useConfiguration } from '@/core';
import { defineComponent, PropType, ref } from 'vue';
import { VanillaFormFeedbackProps, VanillaFormFeedbackConfig } from './index';

export default defineComponent({
    name: 'VanillaFormFeedback',
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
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
    emits: ['feedbackClick'],
    setup(props) {
        const { localVariant } = useBootVariant(props, '', ref(null));
        const { configuration } = useConfiguration<VanillaFormFeedbackProps>(VanillaFormFeedbackConfig);
        return {
            localVariant,
            configuration,
        };
    },
});
</script>
