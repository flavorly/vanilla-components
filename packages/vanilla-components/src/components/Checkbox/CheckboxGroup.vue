<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import {
    useBootVariant,
    useConfigurationWithClassesList,
    useMultipleOptions,
    useMultipleVModel,
    useVariantProps,
} from '../../core'
import type { VanillaCheckboxProps } from './index'
import { VanillaCheckboxClassesKeys, VanillaCheckboxConfig } from './index'
import VanillaFormErrors from '../FormErrors/FormErrors.vue'
import VanillaFormFeedback from '../FormFeedback/FormFeedback.vue'
import VanillaFormLabel from '../FormLabel/FormLabel.vue'
import VanillaCheckbox from './Checkbox.vue'
import type { VanillaSelectValue } from '../Select'
import type { InputOptions } from '../../core/types'

export default defineComponent({
    name: 'VanillaCheckboxGroup',
    components: {
        VanillaFormErrors,
        VanillaFormFeedback,
        VanillaFormLabel,
        VanillaCheckbox,
    },
    inheritAttrs: false,
    props: {
        ...useVariantProps<VanillaCheckboxProps>(),
        modelValue: {
            type: [
                String,
                Number,
                Boolean,
                Array,
                Object,
                Date,
                Function,
                Symbol,
            ] as PropType<VanillaSelectValue>,
            default: undefined,
        },
        options: {
            type: [Array, Object] as PropType<InputOptions>,
            default: undefined,
        },
        normalizeOptions: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        valueAttribute: {
            type: String as PropType<string | undefined>,
            default: 'value',
        },
        textAttribute: {
            type: String as PropType<string | undefined>,
            default: 'text',
        },
    },
    emits: [
        'update:modelValue',
    ],
    setup(props) {
        const { localValue } = useMultipleVModel(props, 'modelValue', props)

        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', localValue)

        const { configuration } = useConfigurationWithClassesList<VanillaCheckboxProps>(
            VanillaCheckboxConfig,
            VanillaCheckboxClassesKeys,
            localVariant,
        )

        const { normalizedOptions } = useMultipleOptions(
            computed(() => props.options as InputOptions | undefined),
            computed(() => props.textAttribute),
            computed(() => props.valueAttribute),
            computed(() => props.normalizeOptions!),
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
    class="vanilla-checkbox-group"
    :class="[
      configuration.classesList.container,
      configuration.classesList.groupContainer,
    ]"
  >
    <div
      v-for="(option, index) in normalizedOptions"
      :key="index"
    >
      <div :class="configuration.classesList.groupCheckboxWrapper">
        <div :class="configuration.classesList.groupCheckbox">
          <VanillaCheckbox
            v-model="localValue"
            :name="option.value"
            :value="option.value"
            :variant="localVariant"
          />
        </div>
        <div :class="configuration.classesList.groupLabel">
          <VanillaFormLabel
            :for="option.value.toString()"
            :label="option.text.toString()"
          />
        </div>
      </div>
    </div>
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

