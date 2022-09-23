<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import { useBootVariant, useConfigurationWithClassesList, useVModel, useVariantProps } from '../../core'
import VanillaCheckedIcon from '../icons/checked.vue'
import VanillaUncheckedIcon from '../icons/unchecked.vue'
import type { VanillaToggleProps, VanillaToggleValue } from './toggle.vue'
import { VanillaToggleClassesKeys, VanillaToggleConfig } from './toggle.vue'

export default defineComponent({
    components: {
        VanillaUncheckedIcon,
        VanillaCheckedIcon,
    },
    inheritAttrs: false,
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
        align: {
            type: [String] as PropType<string>,
            required: false,
            default: 'left',
            validator(align: string) {
                return ['left', 'right', 'center'].includes(align)
            },
        },
    },
    emits: [
        'update:modelValue',
    ],
    setup(props) {
        const localRef = ref(null)
        const localValue = useVModel(props, 'modelValue')

        // When toggle changes, emit the update in a different way.
        const emitUpdate = (event: Event | any) => {
            const isChecked = event.target?.checked

            // It's an array
            if (Array.isArray(localValue.value)) {
                const newValue = [...localValue.value]

                if (isChecked) {
                    newValue.push(props.value)
                }
 else {
                    newValue.splice(newValue.indexOf(props.value), 1)
                }

                localValue.value = newValue
                return
            }

            // It's an object
            if (typeof localValue.value === 'object' && localValue.value !== null) {
                const temporaryValue = props.value
                const temporaryObject = localValue.value
                if (isChecked) {
                    // @ts-expect-error: We assume its a string or will throw an error
                    temporaryObject[temporaryValue] = true
                }
 else {
                    // @ts-expect-error: We assume its a string or will throw an error
                    delete temporaryObject[temporaryValue]
                }
                localValue.value = temporaryObject
                return
            }

            // It's a boolean
            const toggleValue = isChecked ? props.checkedValue : props.uncheckedValue
            localValue.value = toggleValue
        }

        // Check if the value is checked
        const isChecked = computed(() => {
            if (Array.isArray(localValue.value) && typeof props.value === 'string') {
                return localValue.value.includes(props.value)
            }
            return localValue.value === props.checkedValue
        })

        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', localValue)

        const { configuration } = useConfigurationWithClassesList<VanillaToggleProps>(
            VanillaToggleConfig,
            VanillaToggleClassesKeys,
            localVariant,
        )

        return {
            configuration,
            localValue,
            localVariant,
            localErrors,
            localRef,
            hasErrors,
            props,
            emitUpdate,
            isChecked,
        }
    },
})
</script>

<template>
  <div
    :class="[
      configuration.classesList.wrapper,
      align === 'center' ? configuration.classesList.wrapperCenter : '',
      align === 'left' ? configuration.classesList.wrapperLeft : '',
      align === 'right' ? configuration.classesList.wrapperRight : '',
    ]"
  >
    <input
      :id="name"
      ref="localRef"
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
      @click="$refs.localRef.click()"
    >
      <span
        :class="[isChecked ? 'translate-x-5' : 'translate-x-0']"
        aria-hidden="true"
        class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 flex items-center justify-center"
      >
        <!-- Checked Slot -->
        <slot
          :is-checked="isChecked"
          name="unchecked"
        >
          <VanillaUncheckedIcon
            v-if="!isChecked"
            :class="configuration.classesList.iconUnchecked"
          />
        </slot>
        <!-- Un-Checked Slot -->
        <slot
          :is-checked="isChecked"
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
