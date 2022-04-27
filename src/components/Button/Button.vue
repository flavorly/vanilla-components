<template>
  <component
    :is="as"
    ref="localRef"
    :class="[
      configuration.classesList.button,
      disabled ? configuration.classesList.disableOpacity : '',
      loading || disabled ? configuration.classesList.busyOrInvalidState : '',
      !disabled && !loading ? configuration.classesList.enableOpacity : '',
    ]"
    v-bind="$attrs"
    :type="type"
    :disabled="disabled"
    @click="handleClickEvent"
  >
    <div :class="configuration.classesList.container">
      <slot name="default">
        <!-- Loading Icon -->
        <span v-if="loading">
          <VanillaLoadingSpinner :class="configuration.classesList.spinner" />
        </span>
        <!-- If not loading, show the user provided icon -->
        <span v-if="!loading && hasSlot($slots.icon)">
          <slot name="icon" />
        </span>
        <!-- Actual button label -->
        <slot name="label">
          <span>
            {{ label }}
          </span>
        </slot>
      </slot>
    </div>
  </component>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, ref } from 'vue';
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
        focusOnMount: {
            type: [Boolean] as PropType<boolean>,
            default: false,
        },
    },
    emits: [
        'click',
    ],
    setup(props, { emit }) {
        const localRef = ref(null) as Ref<HTMLElement | null>;
        const localValue = ref(props.variant);
        const { localVariant } = useBootVariant(props, 'errors', localValue);

        const { configuration } = useConfigurationWithClassesList<VanillaButtonProps>(
            VanillaButtonConfig,
            VanillaButtonClassesKeys,
            localVariant,
        );

        // If its disable, just ignore it
        const handleClickEvent = (event: MouseEvent) => {
            if (props.disabled || props.loading) {
                event.preventDefault();
                event.stopPropagation();
            }
            emit('click', event);
        };

        // Focus on mount, (useful for modals )
        onMounted(() => {
            if (props.focusOnMount) {
                localRef.value?.focus();
            }
        });

        return {
            configuration,
            localValue,
            localVariant,
            props,
            hasSlot,
            localRef,
            handleClickEvent,
        };
    },
});
</script>

