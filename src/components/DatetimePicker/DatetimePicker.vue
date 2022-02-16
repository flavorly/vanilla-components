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
          configuration.classesList.input
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
import { defineComponent, PropType, onMounted, ref, nextTick } from 'vue';
import { useBootVariant, useVModel, useVariantProps, useConfigurationWithClassesList } from '@/use';
import { hasSlot } from '@/core/helpers';
import { VanillaDatetimePickerValue, VanillaDatetimePickerProps } from '@/components/DatetimePicker/Type';
import { VanillaDatetimePickerClassesKeys, VanillaDatetimePickerConfig } from '@/components/DatetimePicker/Config';
import { ExclamationCircleIcon } from '@heroicons/vue/solid';
import VanillaFormErrors from '@/components/FormErrors/FormErrors.vue';
import VanillaFormFeedback from '@/components/FormFeedback/FormFeedback.vue';
import Flatpickr from 'flatpickr';

export default defineComponent({
    name: 'VanillaDatetimePicker',
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
                };
            },
        },
        type: {
            type: [String] as PropType<string>,
            default: 'text',
        },
    },
    setup(props) {
        const localValue = useVModel(props, 'modelValue');
        const flatpickrInput = ref(null);
        const {
            errors,
            hasErrors,
            localVariant,
        } = useBootVariant(props, 'errors', localValue);

        const { configuration } = useConfigurationWithClassesList<VanillaDatetimePickerProps>(
            VanillaDatetimePickerConfig,
            VanillaDatetimePickerClassesKeys,
            localVariant,
        );

        // On mounted start flatpickr
        onMounted(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            Flatpickr(flatpickrInput.value, props.options);
        });

        return {
            configuration,
            localValue,
            localVariant,
            errors,
            hasErrors,
            hasSlot,
            flatpickrInput,
        };
    },
});
</script>

