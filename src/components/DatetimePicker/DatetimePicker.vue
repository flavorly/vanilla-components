<script lang="ts">
import type { PropType } from 'vue'
import {
    defineComponent,
    onMounted,
    ref,
} from 'vue'

import Flatpickr from 'flatpickr'
import type {
    VanillaDatetimePickerProps,
    VanillaDatetimePickerValue,
} from './index'
import {
    VanillaDatetimePickerClassesKeys,
    VanillaDatetimePickerConfig,
} from './index'
import {
    hasSlot,
    useBootVariant,
    useConfigurationWithClassesList,
    useVModel,
    useVariantProps,
} from '@/core'

import VanillaFormErrors from '@/components/FormErrors/FormErrors.vue'
import VanillaFormFeedback from '@/components/FormFeedback/FormFeedback.vue'
import ExclamationCircleIcon from '@/components/Icons/Hero/Solid/ExclamationCircleIcon.vue'

export default defineComponent({
    name: 'VanillaDatetimePicker',
    components: {
        VanillaFormErrors,
        VanillaFormFeedback,
        ExclamationCircleIcon,
    },
    inheritAttrs: false,
    props: {
        ...useVariantProps<VanillaDatetimePickerProps>(),
        modelValue: {
            type: [String, undefined] as PropType<VanillaDatetimePickerValue>,
            default: undefined,
        },
        options: {
            type: [Object] as PropType<object>,
            default: () => {
                return {
                    enableTime: true,
                    time_24hr: true,
                }
            },
        },
        type: {
            type: [String] as PropType<string>,
            default: 'text',
        },
    },
    setup(props) {
        const localValue = useVModel(props, 'modelValue')
        const flatpickrInput = ref(null)
        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', localValue)

        const { configuration } = useConfigurationWithClassesList<VanillaDatetimePickerProps>(
            VanillaDatetimePickerConfig,
            VanillaDatetimePickerClassesKeys,
            localVariant,
        )

        // On mounted start flatpickr
        onMounted(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            Flatpickr(flatpickrInput.value, props.options)
        })

        return {
            configuration,
            localValue,
            localVariant,
            localErrors,
            hasErrors,
            hasSlot,
            flatpickrInput,
        }
    },
})
</script>

<template>
  <div class="vanilla-input">
    <div :class="configuration.classesList.wrapper">
      <div
        v-if="hasSlot($slots.before)"
        :class="configuration.classesList.addonBefore"
      >
        <slot name="before" />
      </div>
      <input
        :id="name"
        v-bind="$attrs"
        ref="flatpickrInput"
        v-model="localValue"
        :name="name"
        :class="[
          hasSlot($slots.before) ? configuration.classesList.addonBeforeInputClasses : '',
          hasSlot($slots.after) || hasErrors ? configuration.classesList.addonAfterInputClasses : '',
          configuration.classesList.input,
        ]"
        :type="type"
      >
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

