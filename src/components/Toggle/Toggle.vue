<template>
  <vanilla-input-layout :layout="layout">
    <!--    <template #label>-->
    <!--      <slot-->
    <!--        v-if="($slots.label || label) && templateLabel"-->
    <!--        name="label"-->
    <!--      >-->
    <!--        <vanilla-form-label-->
    <!--          :label-for="name"-->
    <!--          :value="label"-->
    <!--          @click="onClickLabel"-->
    <!--        />-->
    <!--      </slot>-->
    <!--    </template>-->
    <div
      :class="[classes.wrapper]"
    >
      <slot
        name="labelBefore"
        v-bind="{label}"
      >
        <span
          v-if="label && !labelAfter && !templateLabel"
          class="mr-3"
          @click="onClickLabel"
        >
          <label
            :for="name"
            :class="[classes.label]"
          >
            {{ label }}
          </label>
        </span>
      </slot>

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
        :class="{
          'bg-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:border': !isChecked && !hasErrors,
          'focus:ring-primary-600': !hasErrors,
          'focus:ring-red-600': hasErrors,
          'bg-primary-600': isChecked && !hasErrors,
          'bg-red-500': isChecked && hasErrors,
          'border-red-500 dark:border': hasErrors,
        }"
        aria-pressed="false"
        class="form-toggle"
        type="button"
        v-bind="$attrs"
        @click="$refs.checkbox.click()"
      >
        <span
          :class="[isChecked ? 'translate-x-5' : 'translate-x-0']"
          aria-hidden="true"
          class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 flex items-center justify-center"
        >
          <!-- Checked Slot -->
          <slot
            :isChecked="isChecked"
            name="unchecked"
          >
            <svg
              v-if="!isChecked"
              class="h-3 w-3 text-gray-400"
              fill="none"
              viewBox="0 0 12 12"
            >
              <path
                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </slot>
          <!-- Un-Checked Slot -->
          <slot
            :isChecked="isChecked"
            name="checked"
          >
            <svg
              v-if="isChecked"
              class="h-3 w-3"
              :class="{
                'text-primary-600': !hasErrors,
                'text-red-600': hasErrors
              }"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
            </svg>
          </slot>
        </span>
      </button>
      <slot
        name="labelAfter"
        v-bind="{label}"
      >
        <span
          v-if="label && labelAfter && !templateLabel"
          class="ml-3"
          @click="onClickLabel"
        >
          <label
            :for="name"
            :class="[classes.label]"
          >
            {{ label }}
          </label>
        </span>
      </slot>
    </div>
    <vanilla-form-errors
      v-if="hasErrors && showErrors"
      class="mt-5"
      :error="internalErrors"
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
import VanillaFormLabel from "@/components/Inputs/Partials/Label.vue";
import VanillaFormErrors from "@/components/Inputs/Partials/Errors.vue";
import VanillaFormHelper from "@/components/Inputs/Partials/Helper.vue";

export default {
    name: 'VanillaInputToggle',
    components: {
        VanillaFormLabel,
        VanillaInputLayout,
        VanillaFormHelper,
        VanillaFormErrors,
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
            sync: 'internalValue',
        },
        trueValue: {
            default: true,
        },
        falseValue: {
            default: false,
        },
        labelAfter: {
            type: Boolean,
            default: true,
        },
        templateLabel : {
            type: Boolean,
            default: false,
        },
        classes: {
            type: [Object],
            default: () => ({
                wrapper: 'flex items-center justify-center',
                label: 'text-sm font-medium text-gray-700',
            }),
        }
    },
    emits: [
        'update:modelValue'
    ],
    computed: {
        isChecked() {
            if (this.modelValue instanceof Array) {
                return this.modelValue.includes(this.value);
            }

            return this.modelValue === this.trueValue;
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
                this.internalValue = newValue;
                return;
            }

            this.internalValue = isChecked ? this.trueValue : this.falseValue;
        },
    },
};
</script>
