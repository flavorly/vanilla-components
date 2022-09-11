<template>
  <div class="vanilla-input">
    <div :class="configuration.classesList.wrapper">
      <div
        v-if="hasSlot($slots.before)"
        :class="configuration.classesList.addonBefore"
      >
        <slot name="before" />
      </div>
      <textarea
        :id="name"
        ref="localRef"
        v-model="localValue"
        :name="name"
        :autocomplete="autocomplete"
        :class="[
          hasSlot($slots.before) ? configuration.classesList.addonBeforeInputClasses : '',
          hasSlot($slots.after) || hasErrors ? configuration.classesList.addonAfterInputClasses : '',
          configuration.classesList.input
        ]"
        v-bind="$attrs"
      />
      <div
        v-if="hasSlot($slots.after) || hasErrors"
        :class="configuration.classesList.addonAfter"
      >
        <slot name="after">
          <ExclamationCircleIcon
            v-if="hasErrors"
            :class="configuration.classesList.addonClasses"
          />
        </slot>
      </div>
    </div>
    <slot
      name="errors"
      v-bind="{hasErrors, localErrors}"
    >
      <VanillaFormErrors
        v-if="hasErrors && showErrors"
        :errors="localErrors"
      />
    </slot>
    <slot
      name="feedback"
      v-bind="{hasErrors, feedback}"
    >
      <VanillaFormFeedback
        v-if="!hasErrors && feedback !== undefined && showFeedback"
        :text="feedback"
      />
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useBootVariant, useVModel, useVariantProps, useConfigurationWithClassesList } from '@/core/use';
import { hasSlot } from '@/core/helpers';
import { VanillaTextareaValue, VanillaTextareaProps } from '@/components/Textarea/Type';
import { VanillaTextareaClassesKeys, VanillaTextareaConfig } from '@/components/Textarea/Config';
import { ExclamationCircleIcon } from '@heroicons/vue/24/solid';
import VanillaFormErrors from '@/components/FormErrors/FormErrors.vue';
import VanillaFormFeedback from '@/components/FormFeedback/FormFeedback.vue';

export default defineComponent({
    name: 'VanillaTextarea',
    components: {
        VanillaFormErrors,
        VanillaFormFeedback,
        ExclamationCircleIcon,
    },
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VanillaTextareaProps>(),
        modelValue: {
            type: [String, Number] as PropType<VanillaTextareaValue>,
            default: undefined,
        },
        rows: {
            type: [String, Number] as PropType<string | number>,
            default: 4,
        },
    },
    setup(props) {
        const localRef = ref(null);
        const localValue = useVModel(props, 'modelValue');
        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', localValue);

        const { configuration } = useConfigurationWithClassesList<VanillaTextareaProps>(
            VanillaTextareaConfig,
            VanillaTextareaClassesKeys,
            localVariant,
        );

        return {
            configuration,
            localRef,
            localValue,
            localVariant,
            localErrors,
            hasErrors,
            hasSlot,
        };
    },
});
</script>

