<template>
  <component
    :is="as"
    :class="[
      configuration.classesList.button,
      disabled ? configuration.classesList.disableOpacity : '',
      loading || disabled ? configuration.classesList.busyOrInvalidState : '',
      !disabled && !loading ? configuration.classesList.enableOpacity : '',
    ]"
    :type="type"
    v-bind="$attrs"
    @click="$emit('click',$event)"
  >
    <slot name="default">
      <span :class="configuration.classesList.container">
        <!-- Loading Icon -->
        <span v-show="loading">
          <VanillaLoadingSpinner :class="configuration.classesList.spinner" />
        </span>
        <!-- If not loading, show the user provided icon -->
        <span v-show="!loading && hasSlot($slots.icon)">
          <slot name="icon" />
        </span>
        <!-- Actual button label -->
        <span>
          {{ label }}
        </span>
      </span>
    </slot>
  </component>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useBootVariant, useVariantProps, useConfigurationWithClassesList, hasSlot } from '@/core';
import { VanillaButtonProps, VanillaButtonClassesKeys, VanillaButtonConfig } from '@/components/Button/index';
import VanillaLoadingSpinner from '@/components/Icons/LoadingSpinner.vue';

export default defineComponent({
    name: 'VanillaButton',
    components: {
        VanillaLoadingSpinner,
    },
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VanillaButtonProps>(),
        as: {
            type: [String] as PropType<string>,
            default: 'button',
        },
        label: {
            type: [String] as PropType<string>,
            default: 'Button',
        },
        loading: {
            type: [Boolean] as PropType<boolean>,
            default: false,
        },
        disabled: {
            type: [Boolean] as PropType<boolean>,
            default: false,
        },
        type: {
            type: [String] as PropType<string>,
            default: 'button',
        },
    },
    emits: [
        'click',
    ],
    setup(props) {

        const localValue = ref(props.variant);
        const { localVariant } = useBootVariant(props, 'errors', localValue);

        const { configuration } = useConfigurationWithClassesList<VanillaButtonProps>(
            VanillaButtonConfig,
            VanillaButtonClassesKeys,
            localVariant,
        );

        return {
            configuration,
            localValue,
            localVariant,
            props,
            hasSlot,
        };
    },
});
</script>

