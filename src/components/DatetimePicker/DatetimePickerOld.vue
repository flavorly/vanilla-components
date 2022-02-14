<template>
  <vanilla-input-layout
    :layout="layout"
  >
    <template #label>
      <slot
        v-if="$slots.label || label"
        name="label"
      >
        <vanilla-form-label
          :label-for="name"
          :value="label"
          @click="onClickLabel"
        />
      </slot>
    </template>

    <div class="relative flex">
      <slot name="before" />
      <input
        :id="uuid(name)"
        ref="picker"
        v-model="internalValue"
        :name="uuid(name)"
        type="text"
        :autocomplete="name"
        :class="[
          hasErrors ? 'danger' : '',
          classesForButtonHasGroupAbove,
          classesForButtonHasGroupBellow
        ]"
        class="form-input"
        v-bind="$attrs"
        @update:model-value="$emit('update:modelValue', $event)"
      >
      <slot name="after" />
      <div
        v-if="hasErrors && showLeadingErrorIcon"
        class="form-errors-container"
      >
        <ExclamationCircleIcon class="form-errors-icon" />
      </div>
    </div>
    <vanilla-form-errors
      v-if="hasErrors && showErrors"
      :error="errors"
    />
    <vanilla-form-helper
      v-if="help"
      :text="help"
    />
  </vanilla-input-layout>
</template>
<script>
import { ExclamationCircleIcon } from '@heroicons/vue/solid';
import UseFormInputs from '@/utils/UseFormInputs';
import VanillaInputLayout from '@/components/Inputs/Partials/Layout.vue';
import VanillaFormErrors from '@/components/Inputs/Partials/Errors.vue';
import VanillaFormHelper from '@/components/Inputs/Partials/Helper.vue';
import VanillaFormLabel from '@/components/Inputs/Partials/Label.vue';
import Flatpickr from 'flatpickr';

export default {
    name: 'VanillaInputDateTimePickerOld',
    components: {
        VanillaFormLabel,
        VanillaFormHelper,
        VanillaFormErrors,
        VanillaInputLayout,
        ExclamationCircleIcon,
    },
    mixins: [UseFormInputs],
    inheritAttrs: false,
    props: {
        options: {
            type: Object,
            default: () => {
                return {
                    enableTime: true,
                    time_24hr: true,
                };
            },
        },
    },
    emits: ['update:modelValue'],
    mounted() {
        new Flatpickr(this.$refs.picker, this.options);
    },
};
</script>
