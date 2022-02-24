<template>
  <div class="checkbox">
    <div :class="configuration.classesList.wrapper">
      <t-checkbox
        :id="name"
        v-model="localValue"
        :name="name"
        :variant="localVariant"
        type="checkbox"
        :checked="trueValue === localValue"
        v-bind="$attrs"
      />
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
import { defineComponent, PropType } from 'vue';
import { useBootVariant, useVModelBoolean, useVariantProps, useConfigurationWithClassesList } from '@/core';
import { VanillaCheckboxValue, VanillaCheckboxProps, VanillaCheckboxClassesKeys, VanillaCheckboxConfig } from '@/components/Checkbox/index';
import VanillaFormErrors from '@/components/FormErrors/FormErrors.vue';
import VanillaFormFeedback from '@/components/FormFeedback/FormFeedback.vue';
import { TCheckbox } from '@variantjs/vue';

export default defineComponent({
    name: 'VanillaCheckbox',
    components: {
        VanillaFormErrors,
        VanillaFormFeedback,
        TCheckbox,
    },
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VanillaCheckboxProps>(),
        modelValue: {
            type: [Boolean, String, Number, Object, Array] as PropType<VanillaCheckboxValue>,
            default: undefined,
        },
        trueValue: {
            type: [Boolean, String, Number, Object, Array] as PropType<never>,
            default: 'im true',
        },
        falseValue: {
            type: [Boolean, String, Number, Object, Array] as PropType<never>,
            default: 'im false',
        },
    },
    setup(props) {
        const localValue = useVModelBoolean(
            props,
            'modelValue',
            props.trueValue,
            props.falseValue,
        );
        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', localValue);

        const { configuration } = useConfigurationWithClassesList<VanillaCheckboxProps>(
            VanillaCheckboxConfig,
            VanillaCheckboxClassesKeys,
            localVariant,
        );

        return {
            configuration,
            localValue,
            localVariant,
            localErrors,
            hasErrors,
            props,
        };
    },
});
</script>

