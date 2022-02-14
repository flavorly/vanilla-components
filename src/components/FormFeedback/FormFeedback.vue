<template>
  <div
    v-if="text"
    :class="configuration.class"
  >
    <span
      v-if="safe"
      v-html="text"
    />
    <span v-else>{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { useBootVariant, useVariantProps } from '@/use';
import { defineComponent, PropType, ref } from 'vue';
import { VanillaFormFeedbackProps } from '@/components/FormFeedback/Type';
import { VanillaFormFeedbackConfig } from '@/components/FormFeedback/Config';
import useConfiguration from '@/use/useConfiguration';

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
