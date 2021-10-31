<template>
  <x-input-layout :layout="layout">
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

    <div class="relative flex-1">
      <input
        :id="uuid(name)"
        ref="input"
        v-model="modelValue"
        :autocomplete="name"
        :class="[ hasErrors ? 'danger' : '', inputClass]"
        :type="type"
        class="form-input"
        v-bind="$attrs"
      >
      <div
        class="absolute inset-y-0 right-0 pr-3 flex items-center z-10 cursor-pointer"
        @click="togglePassword"
      >
        <i
          v-show="!showingPassword"
          :class="[hasErrors ? 'text-red-400' : 'text-gray-500']"
          class="fa fa-eye"
        />
        <i
          v-show="showingPassword"
          :class="[hasErrors ? 'text-red-400' : 'text-gray-500']"
          class="fa fa-eye-slash"
        />
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
import UseFormInputs from "@/utils/UseFormInputs";
import XInputLayout from "@/components/Inputs/Partials/Layout";
import XFormErrors from "@/components/Inputs/Partials/Errors";
import XFormHelper from "@/components/Inputs/Partials/Helper";
import XFormLabel from "@/components/Inputs/Partials/Label";

export default {
    name: 'XInputPassword',
    components: {
        XFormLabel,
        XFormHelper,
        XFormErrors,
        XInputLayout,
    },
    mixins: [UseFormInputs],
    inheritAttrs: false,
    props: {
        inputClass: {
            type: String,
            default: "",
        },
        modelValue: {
            required: true,
        },
    },
    data() {
        return {
            showingPassword: false,
            type: 'password'
        };
    },
    methods: {
        togglePassword() {
            this.showingPassword = !this.showingPassword;
            this.type = this.showingPassword ? 'text' : 'password';
        },
    },
};
</script>
