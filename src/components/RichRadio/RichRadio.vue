<template>
  <div
    class="vanilla-input"
    :class="configuration.classesList?.wrapper"
  >
    <RadioGroup
      v-model="localValue"
      :class="configuration.classesList?.container"
    >
      <div
        :class="[
          configuration.classesList?.optionContainer,
          separated ? configuration.classesList?.optionContainerSeparated : configuration.classesList?.optionContainerNonSeparated
        ]"
      >
        <RadioGroupOption
          v-for="(option,index) in normalizedOptions"
          :key="option.value"
          v-slot="{ active, checked }"
          as="div"
          :value="option.value"
          :disabled="option?.disabled || false"
        >
          <slot name="option">
            <!-- Option -->
            <VanillaRichRadioOption
              :option="option"
              :active="active"
              :checked="checked"
              :option-index="index"
              :total-options="normalizedOptions.length"
              :separated="separated"
              :compact="compact"
              :radio="radio"
              :variant="localVariant"
              :disabled="option.disabled || false"
            >
              <template #radioIcon>
                <slot
                  name="radioIcon"
                  v-bind="{option,active, checked,index,compact,radio}"
                />
              </template>

              <template #label>
                <slot
                  name="label"
                  v-bind="{option,active, checked,index,compact,radio}"
                />
              </template>

              <template #description>
                <slot
                  name="description"
                  v-bind="{option,active, checked,index,compact,radio}"
                />
              </template>

              <template #svgIcon>
                <slot
                  name="svgIcon"
                  v-bind="{option,active, checked,index,compact,radio}"
                />
              </template>
            </VanillaRichRadioOption>
          </slot>
        </RadioGroupOption>
      </div>
    </RadioGroup>
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
import { useBootVariant, useVariantProps, useConfigurationWithClassesList, useVModel } from '@/core';
import { VanillaRichRadioValue, VanillaRichRadioProps, VanillaRichRadioClassesKeys, VanillaRichRadioConfig } from '@/components/RichRadio/index';
import VanillaFormErrors from '@/components/FormErrors/FormErrors.vue';
import VanillaFormFeedback from '@/components/FormFeedback/FormFeedback.vue';
import VanillaRichRadioOption from '@/components/RichRadio/RichRadioOption/RichRadioOption.vue';
import { RadioGroup, RadioGroupOption } from '@headlessui/vue';
import { InputOptions } from '@/core/types';
import { normalizeOptions } from '@/core';


export default defineComponent({
    name: 'VanillaRichRadio',
    components: {
        VanillaFormErrors,
        VanillaFormFeedback,
        VanillaRichRadioOption,
        RadioGroup,

        RadioGroupOption,
    },
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VanillaRichRadioProps>(),
        modelValue: {
            type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<VanillaRichRadioValue>,
            default: undefined,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        options: {
            type: [Array, Object] as PropType<InputOptions>,
            default: undefined,
        },
        normalizeOptions: {
            type: Boolean,
            default: true,
        },
        valueAttribute: {
            type: String,
            default: 'value',
        },
        textAttribute: {
            type: String,
            default: 'text',
        },
        separated: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        radio: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        compact: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
    },
    emits: [
        'update:modelValue',
    ],
    setup(props) {

        const localValue = useVModel(props, 'modelValue');

        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', localValue);

        const { configuration } = useConfigurationWithClassesList<VanillaRichRadioProps>(
            VanillaRichRadioConfig,
            VanillaRichRadioClassesKeys,
            localVariant,
        );

        const normalizedOptions = normalizeOptions(
            props.options,
            props.textAttribute,
            props.valueAttribute,
        );

        return {
            configuration,
            localValue,
            localVariant,
            localErrors,
            hasErrors,
            props,
            normalizedOptions,
        };
    },
});
</script>

