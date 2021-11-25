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
      <select
        :id="name"
        ref="input"
        v-model="modelValue"
        class="form-input"
        :class="[
          hasErrors ? 'danger' : '',
          classesForButtonHasGroupAbove,
          classesForButtonHasGroupBellow
        ]"
        v-bind="$attrs"
      >
        <option
          v-if="empty && showEmpty"
          :value="empty.value"
          v-html="empty.title"
        />

        <template
          v-for="(item, index) in options"
          :key="index"
        >
          <slot
            :item="item"
            :index="index"
            name="option"
          >
            <option
              :value="item?.value || index"
            >
              {{ item?.text || item?.label || item }}
            </option>
          </slot>
        </template>
      </select>
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
import VanillaInputLayout from "@/components/Inputs/Partials/Layout.vue";
import VanillaFormErrors from "@/components/Inputs/Partials/Errors.vue";
import VanillaFormHelper from "@/components/Inputs/Partials/Helper.vue";
import VanillaFormLabel from "@/components/Inputs/Partials/Label.vue";

export default {
    name: 'VanillaInputSelect',
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
            default: null,
            required: false,
        },
        options: {
            type: [Array,Object],
            default: () => [],
        },
        showEmpty: {
            type: Boolean,
            default: true,
        },
        empty: {
            type: Object,
            default: () => {
                return {
                    value: null,
                    title: "&mdash;",
                };
            },
        },
    },
};
</script>
