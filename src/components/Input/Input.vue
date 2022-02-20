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
        v-model="localValue"
        :name="name"
        :class="[
          hasSlot($slots.before) ? configuration.classesList.addonBeforeInputClasses : '',
          hasSlot($slots.after) || hasErrors ? configuration.classesList.addonAfterInputClasses : '',
          configuration.classesList.input
        ]"
        :type="localType"
        v-bind="$attrs"
      >
      <div
        v-if="hasSlot($slots.after) || hasErrors || type === 'password'"
        :class="configuration.classesList.addonAfter"
      >
        <slot name="after">
          <ExclamationCircleIcon
            v-if="hasErrors && type !== 'password'"
            :class="configuration.classesList.addonClasses"
          />
          <EyeIcon
            v-if="type === 'password' && !showingPassword"
            :class="configuration.classesList.addonClasses"
            @click="togglePassword"
          />
          <EyeOffIcon
            v-if="showingPassword"
            :class="configuration.classesList.addonClasses"
            @click="togglePassword"
          />
        </slot>
      </div>
    </div>
    <slot
      name="errors"
      v-bind="{hasErrors, errors}"
    >
      <VanillaFormErrors
        v-if="hasErrors"
        :errors="errors"
      />
    </slot>
    <slot
      name="feedback"
      v-bind="{hasErrors, feedback}"
    >
      <VanillaFormFeedback
        v-if="!hasErrors && feedback !== undefined"
        :text="feedback"
      />
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useBootVariant, useVModel, useVariantProps, useConfigurationWithClassesList, hasSlot } from '@/core';
import { VanillaInputValue, VanillaInputProps, VanillaInputClassesKeys, VanillaInputConfig } from '@/components/Input/index';
import { ExclamationCircleIcon, EyeIcon, EyeOffIcon } from '@heroicons/vue/solid';
import VanillaFormErrors from '@/components/FormErrors/FormErrors.vue';
import VanillaFormFeedback from '@/components/FormFeedback/FormFeedback.vue';

export default defineComponent({
    name: 'VanillaInput',
    components: {
        VanillaFormErrors,
        VanillaFormFeedback,
        ExclamationCircleIcon,
        EyeIcon,
        EyeOffIcon,
    },
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
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
    },
    setup(props) {
        const localValue = useVModel(props, 'modelValue');
        const localType = ref(props.type);
        const {
            errors,
            hasErrors,
            localVariant,
        } = useBootVariant(props, 'errors', localValue);

        const { configuration } = useConfigurationWithClassesList<VanillaInputProps>(
            VanillaInputConfig,
            VanillaInputClassesKeys,
            localVariant,
        );

        // When type is password
        const showingPassword = ref(false);
        const togglePassword = () => {
            showingPassword.value = !showingPassword.value;
            localType.value = showingPassword.value ? 'text' : 'password';
        };

        return {
            configuration,
            localValue,
            localVariant,
            localType,
            errors,
            hasErrors,
            hasSlot,
            showingPassword,
            togglePassword,
        };
    },
});
</script>

