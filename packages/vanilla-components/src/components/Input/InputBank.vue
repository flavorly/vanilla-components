<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import { hasSlot, useBootVariant, useConfigurationWithClassesList, useVModel, useVariantProps } from '../../core'
import type { VanillaInputProps, VanillaInputValue } from './index'
import { VanillaInputClassesKeys, VanillaInputConfig } from './index'
import VanillaFormErrors from '../FormErrors/FormErrors.vue'
import VanillaFormFeedback from '../FormFeedback/FormFeedback.vue'

import ExclamationCircleIcon from '../Icons/Hero/Solid/ExclamationCircleIcon.vue'
import EyeIcon from '../Icons/Hero/Solid/EyeIcon.vue'
import EyeSlashIcon from '../Icons/Hero/Solid/EyeSlashIcon.vue'

export default defineComponent({
    name: 'VanillaInput',
    components: {
        VanillaFormErrors,
        VanillaFormFeedback,
        ExclamationCircleIcon,
        EyeIcon,
        EyeSlashIcon,
    },
    inheritAttrs: false,
    props: {
        ...useVariantProps<VanillaInputProps>(),
        modelValue: {
            type: [String, Number] as PropType<VanillaInputValue>,
            default: undefined,
        },
        type: {
            type: [String] as PropType<string>,
            default: 'text',
        },
        placeholder: {
            type: [String] as PropType<string>,
            default: 'text',
        },
    },
    setup(props) {
        const localRef = ref(null)
        const localValue = useVModel(props, 'modelValue')
        const localType = ref(props.type)
        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', localValue)

        const { configuration } = useConfigurationWithClassesList<VanillaInputProps>(
            VanillaInputConfig,
            VanillaInputClassesKeys,
            localVariant,
        )

        // When type is password
        const showingPassword = ref(false)
        const togglePassword = () => {
            showingPassword.value = !showingPassword.value
            localType.value = showingPassword.value ? 'text' : 'password'
        }

        return {
            configuration,
            localValue,
            localVariant,
            localType,
            localErrors,
            localRef,
            hasErrors,
            hasSlot,
            showingPassword,
            togglePassword,
        }
    },
})
</script>

<template>
  <div
    class="vanilla-input"
  >
    <div :class="configuration.classesList.wrapper">
      <div
        v-if="hasSlot($slots.before)"
        :class="configuration.classesList.addonBefore"
      >
        <slot
          name="before"
          v-bind="{ className: configuration.classesList.addonClasses }"
        />
      </div>
      <input
        :id="name"
        ref="localRef"
        v-model="localValue"
        :name="name"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :class="[
          hasSlot($slots.before) ? configuration.classesList.addonBeforeInputClasses : '',
          hasSlot($slots.after) || hasErrors ? configuration.classesList.addonAfterInputClasses : '',
          configuration.classesList.input,
        ]"
        :type="localType"
        v-bind="$attrs"
      >
      <div
        v-if="hasSlot($slots.after) || hasErrors || type === 'password'"
        :class="configuration.classesList.addonAfter"
      >
        <slot
          name="after"
          v-bind="{ hasErrors, type, showingPassword }"
        >
          <ExclamationCircleIcon
            v-if="hasErrors && type !== 'password'"
            :class="configuration.classesList.addonClasses"
          />
          <EyeIcon
            v-if="type === 'password' && !showingPassword"
            :class="configuration.classesList.addonClasses"
            @click="togglePassword"
          />
          <EyeSlashIcon
            v-if="showingPassword"
            :class="configuration.classesList.addonClasses"
            @click="togglePassword"
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

