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
          as="template"
          :value="option.value"
          :disabled="option?.disabled || false"
        >
          <div
            :class="[
              configuration.classesList?.option,
              compact ? configuration.classesList?.optionCompact : configuration.classesList?.optionNonCompact,
              separated ? configuration.classesList?.optionSeperated : '',
              !separated && index === 0 ? configuration.classesList?.optionNonSeparatedFirst : '',
              !separated && index === options.length - 1 ? configuration.classesList?.optionNonSeparatedLast : '',
              checked ? configuration.classesList?.optionChecked : configuration.classesList?.optionUnchecked,
              active ? configuration.classesList?.optionHighlighted : configuration.classesList?.optionNonHighlighted
            ]"
          >
            <!-- If its a checkbox layout -->
            <slot
              name="iconRadio"
              v-bind="{checked}"
            >
              <span
                v-if="radio"
                :class="[
                  configuration.classesList?.radio,
                  active ? configuration.classesList?.radioHighlighted : '',
                  checked ? configuration.classesList?.radioChecked : configuration.classesList?.radioUnchecked
                ]"
                aria-hidden="true"
              >
                <span :class="configuration.classesList?.radioInner" />
              </span>
            </slot>
            <!-- Main Content -->
            <div
              :class="[
                configuration.classesList?.contentWrapper,
                !radio ? configuration.classesList?.contentWrapperIfNotRadio : '',
              ]"
            >
              <!-- Actual option -->
              <slot
                name="option"
                v-bind="{checked,option}"
              >
                <div :class="configuration.classesList?.content">
                  <div :class="configuration.classesList?.contentInner">
                    <slot
                      name="optionLabel"
                      v-bind="{checked,option}"
                    >
                      <RadioGroupLabel
                        as="p"
                        :class="[
                          checked ? configuration.classesList?.labelChecked : configuration.classesList?.labelUnchecked,
                          configuration.classesList?.label
                        ]"
                        v-html="option.text"
                      />
                    </slot>
                    <slot
                      name="optionDescription"
                      v-bind="{checked,option}"
                    >
                      <RadioGroupDescription
                        v-if="option?.raw?.description && !compact"
                        as="span"
                        :class="[
                          configuration.classesList?.description,
                          checked ? configuration.classesList?.descriptionChecked : configuration.classesList?.descriptionUnchecked
                        ]"
                      >
                        <span
                          v-html="option?.raw?.description"
                        />
                      </RadioGroupDescription>
                    </slot>
                  </div>
                </div>
              </slot>
              <!-- Checked but not radio style -->
              <div
                v-show="checked && !radio"
                :class="configuration.classesList?.checkedIconWrapper"
              >
                <slot
                  name="iconSVG"
                  v-bind="{checked}"
                >
                  <svg
                    :class="configuration.classesList?.checkedIcon"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="12"
                      :class="configuration.classesList?.checkedIconOpacity"
                    />
                    <path
                      d="M7 13l3 3 7-7"
                      stroke="#fff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </slot>
              </div>
            </div>
          </div>
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
import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupDescription,
    RadioGroupOption,
} from '@headlessui/vue';
import { InputOptions } from '@/core/types';
import { normalizeOptions } from '@/core';


export default defineComponent({
    name: 'VanillaRichRadio',
    components: {
        VanillaFormErrors,
        VanillaFormFeedback,
        RadioGroup,
        RadioGroupLabel,
        RadioGroupDescription,
        RadioGroupOption,
    },
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
    model: {
        prop: 'checked',
        event: 'change',
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
            default: false,
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

