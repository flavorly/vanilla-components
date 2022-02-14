<template>
  <div
    v-if="hasErrors"
    :class="configuration.class"
  >
    <span
      v-if="safe"
      v-html="errors"
    />
    <span v-else>{{ errors }}</span>
  </div>
</template>

<script lang="ts">
import { useBootVariant, useVariantProps } from '@/use';
import { defineComponent, PropType, ref } from 'vue';
import { VanillaFormErrorsProps } from '@/components/FormErrors/Type';
import { VanillaFormErrorsConfig } from '@/components/FormErrors/Config';
import useConfiguration from '@/use/useConfiguration';

export default defineComponent({
    name: 'VanillaFormErrors',
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VanillaFormErrorsProps>(),
        safe: {
            type: [Boolean] as PropType<boolean>,
            default: true,
            required: false,
        },
    },
    setup(props) {
        const {
            errors,
            hasErrors,
            localVariant,
        } = useBootVariant(props, 'errors', ref(null));

        const { configuration } = useConfiguration<VanillaFormErrorsProps>(VanillaFormErrorsConfig);

        return {
            errors,
            localVariant,
            hasErrors,
            configuration,
        };
    },
});
</script>
