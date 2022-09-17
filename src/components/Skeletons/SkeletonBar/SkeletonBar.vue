<template>
  <component
    :is="as"
    :class="configuration.classesList.wrapper"
  >
    <div
      v-for="(current, index) in count"
      :key="uniqueId(current+'_'+index)"
      :class="configuration.classesList.class"
      v-bind="$attrs"
    />
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useBootVariant, useVariantProps, useConfigurationWithClassesList } from '@/core';
import { VanillaSkeletonBarProps, VanillaSkeletonBarConfig, VanillaSkeletonBarClassesKeys } from './index';
import uniqueId from 'lodash/uniqueId';

export default defineComponent({
    name: 'VanillaSkeletonBar',
    inheritAttrs: false,

    props: {
        ...useVariantProps<VanillaSkeletonBarProps>(),
        count: {
            type: [Number] as PropType<number>,
            required: false,
            default: 1,
        },
        as: {
            type: [String, undefined] as PropType<string | undefined>,
            default: 'div',
            required: false,
        },
    },
    setup(props) {
        const { localVariant } = useBootVariant(props, 'errors', ref(null));

        const { configuration } = useConfigurationWithClassesList<VanillaSkeletonBarProps>(
            VanillaSkeletonBarConfig,
            VanillaSkeletonBarClassesKeys,
            localVariant,
        );

        return {
            localVariant,
            configuration,
            uniqueId,
        };
    },
});
</script>
