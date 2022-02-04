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
        />
      </slot>
    </template>

    <div
      class="relative flex-1"
    >
      <RadioGroup
        :model-value="modelValue"
        @update:model-value="internalValue = $event"
      >
        <div
          class="rounded-lg"
          :class="{
            'space-y-2': separated,
            '-space-y-px': !separated
          }"
        >
          <RadioGroupOption
            v-for="(option,index) in options"
            :key="option.value"
            v-slot="{ active, checked }"
            as="template"
            :value="option.value"
          >
            <div
              :class="{
                'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-primary-600 border border-primary-200 dark:bg-primary-500 dark:border-primary-500 z-10' : active && !hasErrors,
                'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-red-600 border border-primary-200 dark:bg-primary-500 dark:border-red-500 z-10' : active && hasErrors,
                'border border-gray-200 dark:border-gray-700' : !active,
                'bg-primary-100 dark:bg-primary-500/60 text-white border-primary-200 dark:border-primary-500 z-10' : checked && !hasErrors,
                'bg-red-100/70 dark:bg-red-400/10 text-white border-red-200 dark:border-red-500 z-10' : checked && hasErrors,
                'bg-white dark:bg-gray-900': !checked,
                'rounded-tl-lg rounded-tr-lg': !separated && index === 0,
                'rounded-bl-lg rounded-br-lg': !separated && index === options.length - 1,
                'rounded-lg': separated,
                // In case we want the checkbox centered
                'flex items-center content-center': false,
                'px-5 py-4': !compact,
                'px-4 py-2': compact
              }"
              class="relative flex px-5 py-4 cursor-pointer focus:outline-none"
            >
              <!-- If its a checkbox layout -->
              <slot
                name="iconRadio"
                v-bind="{checked}"
              >
                <span
                  v-if="radio"
                  :class="[
                    checked && !hasErrors ? 'bg-primary-600 border-transparent dark:bg-primary-700 ring-offset-white dark:ring-offset-gray-900' : 'bg-white dark:bg-gray-700 border-gray-300',
                    checked && hasErrors ? 'bg-red-600 border-transparent dark:bg-red-700 ring-offset-white dark:ring-offset-gray-900' : 'bg-white dark:bg-gray-700 border-gray-300',
                    active && !hasErrors ? 'ring-2 ring-offset-2 ring-primary-500' : '',
                    active && hasErrors ? 'ring-2 ring-offset-2 ring-red-500' : '',
                    'h-4 w-4 mt-1 cursor-pointer rounded-full border flex items-center justify-center'
                  ]"
                  aria-hidden="true"
                >
                  <span class="rounded-full bg-white w-1.5 h-1.5" />
                </span>
              </slot>
              <!-- Main Content -->
              <div
                class="ml-3 flex items-center justify-between"
                :class="{'w-full': !radio}"
              >
                <!-- Actual option -->
                <slot
                  name="option"
                  v-bind="{checked,option}"
                >
                  <div class="flex items-center">
                    <div class="text-sm">
                      <slot
                        name="optionLabel"
                        v-bind="{checked,option}"
                      >
                        <RadioGroupLabel
                          as="p"
                          :class="{
                            'font-bold text-primary-900 dark:text-white': checked && !hasErrors,
                            'font-bold text-red-900 dark:text-white': checked && hasErrors,
                            'font-normal text-gray-900 dark:text-white': !checked
                          }"
                          class="font-medium"
                          v-html="option.label"
                        />
                      </slot>
                      <slot
                        name="optionDescription"
                        v-bind="{checked,option}"
                      >
                        <RadioGroupDescription
                          v-if="option?.description && !compact"
                          as="span"
                          :class="{
                            'text-primary-700 dark:text-gray-200': checked && !hasErrors,
                            'text-red-700 dark:text-gray-200': checked && hasErrors,
                            'text-gray-500 dark:text-gray-400': !checked
                          }"
                          class="inline"
                        >
                          <span
                            v-html="option?.description"
                          />
                        </RadioGroupDescription>
                      </slot>
                    </div>
                  </div>
                </slot>
                <!-- Checked but not radio style -->
                <div
                  v-show="checked && !radio"
                  class="flex-shrink-0"
                >
                  <slot
                    name="iconSVG"
                    v-bind="{checked}"
                  >
                    <svg
                      class="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="12"
                        class=""
                        :class="{
                          'fill-opacity-90 dark:fill-opacity-30 fill-[#4f46e5] dark:fill-[#fff]': !hasErrors,
                          'fill-opacity-90 dark:fill-opacity-30 fill-red-300 dark:fill-[#fff]': hasErrors,
                        }"
                      />
                      <path
                        d="M7 13l3 3 7-7"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </slot>
                </div>
              </div>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
    <!-- Errors -->
    <vanilla-form-errors
      v-if="hasErrors && showErrors"
      class="px-2 mt-2"
      :error="errors"
    />
    <!-- Helper -->
    <vanilla-form-helper
      v-if="help"
      class="px-2 mt-2"
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
import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupDescription,
    RadioGroupOption,
} from '@headlessui/vue'

export default {
    name: 'VanillaInputRadioGroup',
    components: {
        VanillaFormLabel,
        VanillaFormHelper,
        VanillaFormErrors,
        VanillaInputLayout,
        RadioGroup,
        RadioGroupLabel,
        RadioGroupDescription,
        RadioGroupOption,
    },
    mixins: [UseFormInputs],
    props: {
        options: {
            type: [Object, Array],
            required: true,
            default: () => {
                return [];
            }
        },
        separated: {
            type: Boolean,
            default: false,
        },
        radio: {
            type: Boolean,
            default: false,
        },
        compact: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        isActive(option) {
            return this.selected.value === option.value
        },
        change(option) {
            if (option !== this.selected) {
                this.selected = option;
            }
        }
    }
}
</script>
