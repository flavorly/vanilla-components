<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import uniqueId from 'lodash/uniqueId'
import type { VanillaSkeletonBarProps } from './index'
import { VanillaSkeletonBarClassesKeys, VanillaSkeletonBarConfig } from './index'
import { useBootVariant, useConfigurationWithClassesList, useVariantProps } from '@/core'

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
        const { localVariant } = useBootVariant(props, 'errors', ref(null))

        const { configuration } = useConfigurationWithClassesList<VanillaSkeletonBarProps>(
            VanillaSkeletonBarConfig,
            VanillaSkeletonBarClassesKeys,
            localVariant,
        )

        return {
            localVariant,
            configuration,
            uniqueId,
        }
    },
})
</script>

<template>
  <component
    :is="as"
    :class="configuration.classesList.wrapper"
  >
    <div
      v-for="(current, index) in count"
      :key="uniqueId(`${current}_${index}`)"
      :class="configuration.classesList.class"
      v-bind="$attrs"
    />
  </component>
</template>
