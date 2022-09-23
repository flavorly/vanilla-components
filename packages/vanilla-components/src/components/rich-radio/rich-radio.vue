<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
import {
    normalizeOptions,
    useBootVariant,
    useConfigurationWithClassesList,
    useVModel,
 useVariantProps,
} from '../../core'
import VanillaFormErrors from '../FormErrors/FormErrors.vue'
import VanillaFormFeedback from '../FormFeedback/form-feedback.vue'
import type { InputOptions } from '../../core/types'
import VanillaRichRadioOption from '../RichRadioOption/RichRadioOption.vue'
import {
    VanillaRichRadioClassesKeys,
    VanillaRichRadioConfig,
} from './rich-radio.vue'
import type {
    VanillaRichRadioProps,
    VanillaRichRadioValue,
} from './rich-radio.vue'

export default defineComponent({
    components: {
        VanillaFormErrors,
        VanillaFormFeedback,
        VanillaRichRadioOption,
        RadioGroup,

        RadioGroupOption,
    },
    inheritAttrs: false,
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
        const localValue = useVModel(props, 'modelValue')

        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', localValue)

        const { configuration } = useConfigurationWithClassesList<VanillaRichRadioProps>(
            VanillaRichRadioConfig,
            VanillaRichRadioClassesKeys,
            localVariant,
        )

        const normalizedOptions = normalizeOptions(
            props.options,
            props.textAttribute,
            props.valueAttribute,
        )

        return {
            configuration,
            localValue,
            localVariant,
            localErrors,
            hasErrors,
            props,
            normalizedOptions,
        }
    },
})
</script>

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
          separated ? configuration.classesList?.optionContainerSeparated : configuration.classesList?.optionContainerNonSeparated,
        ]"
      >
        <RadioGroupOption
          v-for="(option, index) in normalizedOptions"
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
                  v-bind="{ option, active, checked, index, compact, radio }"
                />
              </template>

              <template #label>
                <slot
                  name="label"
                  v-bind="{ option, active, checked, index, compact, radio }"
                />
              </template>

              <template #description>
                <slot
                  name="description"
                  v-bind="{ option, active, checked, index, compact, radio }"
                />
              </template>

              <template #svgIcon>
                <slot
                  name="svgIcon"
                  v-bind="{ option, active, checked, index, compact, radio }"
                />
              </template>
            </VanillaRichRadioOption>
          </slot>
        </RadioGroupOption>
      </div>
    </RadioGroup>
    <slot
      name="errors"
      v-bind="{ hasErrors, localErrors }"
    >
      <VanillaFormErrors
        v-if="hasErrors && showErrors"
        :errors="localErrors"
      />
    </slot>
    <slot
      name="feedback"
      v-bind="{ hasErrors, feedback }"
    >
      <VanillaFormFeedback
        v-if="!hasErrors && feedback !== undefined && showFeedback"
        :text="feedback"
      />
    </slot>
  </div>
</template>
