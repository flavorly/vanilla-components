<template>
  <div :class="configuration.classesList.wrapper">
    <span :class="configuration.classesList.container">
      <span
        v-if="pulse"
        :class="[
          configuration.classesList.pulsing,
          configuration.classesList.background,
        ]"
      />
      <span
        :class="[
          configuration.classesList.regular,
          configuration.classesList.background,
        ]"
      />
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useBootVariant, useVariantProps, useConfigurationWithClassesList } from '@/core/use';
import { VanillaStatusIndicatorProps } from '@/components/StatusIndicator/Type';
import { VanillaStatusIndicatorClassesKeys, VanillaStatusIndicatorConfig } from '@/components/StatusIndicator/Config';
export default defineComponent({
    name: 'VanillaStatusIndicator',
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VanillaStatusIndicatorProps>(),
        pulse: {
            type: [Boolean] as PropType<boolean>,
            default: true,
        },
    },
    setup(props) {
        const localRef = ref(null);
        const value = ref(null);
        const { localVariant } = useBootVariant(props, 'errors', value);

        const { configuration } = useConfigurationWithClassesList<VanillaStatusIndicatorProps>(
            VanillaStatusIndicatorConfig,
            VanillaStatusIndicatorClassesKeys,
            localVariant,
        );

        return {
            configuration,
            localRef,
            localVariant,
        };
    },
});
</script>

