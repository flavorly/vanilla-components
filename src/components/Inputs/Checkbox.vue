<template>
  <vanilla-input-layout :layout="'naked'">
    <div class="relative flex items-start">
      <div class="flex items-center h-5">
        <input
          :id="uuid(name)"
          ref="input"
          :checked="isChecked"
          :class="[classVariants]"
          :name="name"
          :value="value"
          class="form-checkbox h-5 w-5"
          type="checkbox"
          v-bind="$attrs"
          @change="updateInput"
        >
      </div>
      <div class="ml-3 text-sm">
        <label
          :for="name"
          class="block text-sm text-gray-900 dark:text-white"
          v-bind="$attrs"
          @click="onClickLabel"
        >
          <slot name="label">
            <div v-html="label" />
          </slot>
        </label>
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

export default {
    name: 'VanillaInputCheckbox',
    components: {
      VanillaFormHelper,
      VanillaFormErrors,
      VanillaInputLayout
    },
    mixins: [
        UseFormInputs
    ],
    model: {
        prop: "modelValue",
        event: "change",
    },
    props: {
        value: {},
        modelValue: {
            default: false,
        },
        trueValue: {
            default: true,
        },
        falseValue: {
            default: false,
        },
    },
    emits: ['update:modelValue'],
    computed: {
        isChecked() {
            if (this.modelValue instanceof Array) {
                return this.modelValue.includes(this.value);
            }

            return this.modelValue === this.trueValue;
        },
        classVariants() {
            return this.hasErrors ? 'danger' : '';
        }
    },
    methods: {
        updateInput(event) {
            let isChecked = event.target.checked;

            if (this.modelValue instanceof Array) {
                let newValue = [...this.modelValue];

                if (isChecked) {
                    newValue.push(this.value);
                } else {
                    newValue.splice(newValue.indexOf(this.value), 1);
                }

                this.$emit("update:modelValue", newValue);
                return;
            }

            this.$emit(
                "update:modelValue",
                isChecked ? this.trueValue : this.falseValue
            );
        },
    },
};
</script>
