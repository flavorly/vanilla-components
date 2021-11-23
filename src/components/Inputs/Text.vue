<template>
  <vanilla-input-layout :layout="layout">
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
        ref="input"
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
      >
      <slot name="after" />
      <div
        v-if="hasErrors && showLeadingErrorIcon"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <ExclamationCircleIcon class="w-5 h-5 text-red-500" />
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
import {ExclamationCircleIcon} from "@heroicons/vue/solid";
import UseFormInputs from "@/utils/UseFormInputs";
import VanillaInputLayout from "@/components/Inputs/Partials/Layout";
import VanillaFormErrors from "@/components/Inputs/Partials/Errors";
import VanillaFormHelper from "@/components/Inputs/Partials/Helper";
import VanillaFormLabel from "@/components/Inputs/Partials/Label";

export default {
    name: 'VanillaInputText',
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
        modelValue: {
            default: '',
            required: false,
        },
    },
};
</script>
