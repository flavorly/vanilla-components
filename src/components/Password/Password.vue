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

    <div class="relative flex-1">
      <input
        :id="uuid(name)"
        ref="input"
        v-model="internalValue"
        :name="uuid(name)"
        :autocomplete="name"
        :class="[
          hasErrors ? 'danger' : '',
          classesForButtonHasGroupAbove,
          classesForButtonHasGroupBellow
        ]"
        :type="type"
        class="form-input"
        v-bind="$attrs"
      >
      <div
        class="absolute inset-y-0 right-0 pr-3 flex items-center z-10 cursor-pointer"
        :class="[hasErrors ? 'text-red-300' : 'text-gray-300']"
        @click="togglePassword"
      >
        <eye-icon
          v-show="!showingPassword"
          class="h-4 w-4"
        />
        <eye-off-icon
          v-show="showingPassword"
          class="h-4 w-4"
        />
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
import UseFormInputs from "@/utils/UseFormInputs";
import VanillaInputLayout from "@/components/Inputs/Partials/Layout.vue";
import VanillaFormErrors from "@/components/Inputs/Partials/Errors.vue";
import VanillaFormHelper from "@/components/Inputs/Partials/Helper.vue";
import VanillaFormLabel from "@/components/Inputs/Partials/Label.vue";
import {EyeIcon, EyeOffIcon} from "@heroicons/vue/solid";

export default {
    name: 'VanillaInputPassword',
    components: {
        VanillaFormLabel,
        VanillaFormHelper,
        VanillaFormErrors,
        VanillaInputLayout,
        EyeIcon,
        EyeOffIcon,
    },
    mixins: [UseFormInputs],
    inheritAttrs: false,
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
