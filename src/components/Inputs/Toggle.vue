<template>
  <vanilla-input-layout :layout="layout">
    <template #label>
      <slot
        v-if="($slots.label || label) && templateLabel"
        name="label"
      >
        <vanilla-form-label
          :label-for="name"
          :value="label"
          @click="onClickLabel"
        />
      </slot>
    </template>

    <div class="flex items-center">
      <span
        v-if="label && !labelAfter && !templateLabel"
        class="ml-3"
      >
        <label
          :for="name"
          class="text-sm font-medium text-gray-700"
          v-bind="$attrs"
        >
          {{ label }}
        </label>
      </span>
      <input
        :id="name"
        ref="checkbox"
        :checked="isChecked"
        :value="value"
        class="hidden"
        type="checkbox"
        @change="updateInput"
      >
      <button
        ref="input"
        :class="[activeState]"
        aria-pressed="false"
        class="form-toggle"
        type="button"
        @click="$refs.checkbox.click()"
      >
        <span
          :class="[isChecked ? 'translate-x-5' : 'translate-x-0']"
          aria-hidden="true"
          class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 flex items-center justify-center"
        >
          <slot
            :isChecked="isChecked"
            name="default"
          />
        </span>
      </button>
      <span
        v-if="label && labelAfter && !templateLabel"
        class="ml-3"
      >
        <label
          :for="name"
          class="text-sm text-gray-700 dark:text-gray-200"
          v-bind="$attrs"
        >
          {{ label }}
        </label>
      </span>
    </div>
  </vanilla-input-layout>
</template>
<script>
import UseFormInputs from "@/utils/UseFormInputs";
import VanillaInputLayout from "@/components/Inputs/Partials/Layout.vue";
import VanillaFormLabel from "@/components/Inputs/Partials/Label.vue";

export default {
    name: 'VanillaInputToggle',
    components: {
        VanillaFormLabel,
        VanillaInputLayout
    },
    mixins: [UseFormInputs],
    model: {
        prop: "modelValue",
        event: "change",
    },
    props: {
        value: {
            required: false,
            default: false
        },
        modelValue: {
            default: false,
        },
        trueValue: {
            default: true,
        },
        falseValue: {
            default: false,
        },
        activeColor: {
            type: String,
            default: "bg-priamry-600",
        },
        labelAfter: {
            type: Boolean,
            default: true,
        },
        templateLabel : {
            type: Boolean,
            default: false,
        }
    },
    emits: ['update:modelValue'],
    computed: {
        isChecked() {
            if (this.modelValue instanceof Array) {
                return this.modelValue.includes(this.value);
            }

            return this.modelValue === this.trueValue;
        },
        activeState() {
            if (this.isChecked) {
                return this.activeColor;
            }

            return "bg-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:border";
        },
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
