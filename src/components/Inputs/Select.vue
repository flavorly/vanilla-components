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
import UseFormInputs from "../../Utils/UseFormInputs";
import XInputLayout from "./Partials/Layout";
import XFormErrors from "./Partials/Errors";
import XFormHelper from "./Partials/Helper";
import XFormLabel from "./Partials/Label";

export default {
    name: 'XSelect',
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
