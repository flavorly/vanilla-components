<template>
  <div :class="configuration.classesList.wrapper">
    <input
      :id="name"
      ref="checkbox"
      :checked="isChecked"
      :value="value"
      style="display: none;"
      type="checkbox"
      @change="emitUpdate"
    >
    <button
      ref="input"
      aria-pressed="false"
      :class="[
        configuration.classesList.toggle,
        isChecked ? configuration.classesList.checked : configuration.classesList.unchecked,
      ]"
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
          <VanillaUncheckedIcon
            v-if="!isChecked"
            :class="configuration.classesList.iconUnchecked"
          />
        </slot>
        <!-- Un-Checked Slot -->
        <slot
          :isChecked="isChecked"
          name="checked"
        >
          <VanillaCheckedIcon
            v-if="isChecked"
            :class="configuration.classesList.iconChecked"
          />
        </slot>
      </span>
    </button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useBootVariant, useVariantProps, useConfigurationWithClassesList, useVModel } from '@/core';
import { VanillaToggleValue, VanillaToggleProps, VanillaToggleClassesKeys, VanillaToggleConfig } from '@/components/Toggle/index';
import VanillaCheckedIcon from '@/components/Icons/CheckedIcon.vue';
import VanillaUncheckedIcon from '@/components/Icons/UncheckedIcon.vue';

export default defineComponent({
    name: 'VanillaToggle',
    components: {
        VanillaUncheckedIcon,
        VanillaCheckedIcon,

    },
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
    model: {
        prop: 'checked',
        event: 'change',
    },
    props: {
        ...useVariantProps<VanillaToggleProps>(),
        modelValue: {
            type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<VanillaToggleValue>,
            default: undefined,
        },
        checked: {
            type: [Boolean] as PropType<boolean>,
            default: false,
        },
        value: {
            type: [String, Number, Boolean, Array, Object, Date, Function, Symbol, undefined] as PropType<VanillaToggleValue>,
            default: false,
        },
        checkedValue: {
            type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<VanillaToggleValue>,
            default: true,
        },
        uncheckedValue: {
            type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<VanillaToggleValue>,
            default: false,
        },
    },
    emits: [
        'update:modelValue',
    ],
    setup(props) {

        const localValue = useVModel(props, 'modelValue');

        // When toggle changes, emit the update in a different way.
        const emitUpdate = (event: Event | any) => {
            let isChecked = event.target?.checked;

            // It's an array
            if (localValue.value instanceof Array) {
                let newValue = [...localValue.value];

                if (isChecked) {
                    newValue.push(props.value);
                } else {
                    newValue.splice(newValue.indexOf(props.value), 1);
                }

                localValue.value = newValue;
                return;
            }

            // It's an object
            if (typeof localValue.value === 'object' && localValue.value !== null){
                let temporaryValue = props.value;
                let temporaryObject = localValue.value;
                if (isChecked){
                    // @ts-expect-error: We assume its a string or will throw an error
                    temporaryObject[temporaryValue] = true;
                } else {
                    // @ts-expect-error: We assume its a string or will throw an error
                    delete temporaryObject[temporaryValue];
                }
                localValue.value = temporaryObject;
                return;
            }

            // It's a boolean
            let toggleValue = isChecked ? props.checkedValue : props.uncheckedValue;
            localValue.value = toggleValue;
        };

        // Check if the value is checked
        const isChecked = computed(() => {
            if (localValue.value instanceof Array && typeof props.value === 'string') {
                return localValue.value.includes(props.value);
            }
            return localValue.value === props.checkedValue;
        });

        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', localValue);

        const { configuration } = useConfigurationWithClassesList<VanillaToggleProps>(
            VanillaToggleConfig,
            VanillaToggleClassesKeys,
            localVariant,
        );

        return {
            configuration,
            localValue,
            localVariant,
            localErrors,
            hasErrors,
            props,
            emitUpdate,
            isChecked,
        };
    },
});
</script>

