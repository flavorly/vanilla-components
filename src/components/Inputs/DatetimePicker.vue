<template>
  <x-input-layout
    :layout="layout"
  >
    <template #label>
      <slot
        v-if="$slots.label || label"
        name="label"
      >
        <x-form-label
          :label-for="name"
          :value="label"
          @click="onClickLabel"
        />
      </slot>
    </template>

    <div class="relative flex">
      <slot name="before" />
      <!--        <flat-pickr-->
      <!--          ref="input"-->
      <!--          v-model="modelValue"-->
      <!--          :config="config"-->
      <!--          class="form-input"-->
      <!--          :class="[-->
      <!--            hasErrors ? 'danger' : '',-->
      <!--            classesForButtonHasGroupAbove,-->
      <!--            classesForButtonHasGroupBellow-->
      <!--          ]"-->
      <!--          v-bind="$attrs"-->
      <!--          @update:modelValue="$emit('update:modelValue', $event)"-->
      <!--        />-->
      <input
        :id="uuid(name)"
        ref="picker"
        v-model="modelValue"
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
        @update:modelValue="$emit('update:modelValue', $event)"
      >
      <slot name="after" />
      <div
        v-if="hasErrors && showLeadingErrorIcon"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <ExclamationCircleIcon class="w-5 h-5 text-red-500" />
      </div>
    </div>
    <x-form-errors
      v-if="hasErrors && showErrors"
      :error="errors"
    />
    <x-form-helper
      v-if="help"
      :text="help"
    />
  </x-input-layout>
</template>
<script>
import {ExclamationCircleIcon} from "@heroicons/vue/solid";
import UseFormInputs from "@/utils/UseFormInputs";
import XInputLayout from "@/components/Inputs/Partials/Layout";
import XFormErrors from "@/components/Inputs/Partials/Errors";
import XFormHelper from "@/components/Inputs/Partials/Helper";
import XFormLabel from "@/components/Inputs/Partials/Label";
import Flatpickr from 'flatpickr';

export default {
    name: 'XDateTimePicker',
    components: {
        XFormLabel,
        XFormHelper,
        XFormErrors,
        XInputLayout,
        ExclamationCircleIcon,
    },
    mixins: [UseFormInputs],
    inheritAttrs: false,
    props: {
        modelValue: {
            default: '',
            required: false,
        },
        config: {
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
        new Flatpickr(this.$refs.picker,this.config)
    }
};
</script>
