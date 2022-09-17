<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import { hasSlot, useBootVariant, useConfigurationWithClassesList, useVariantProps } from '@/core'
import type { VanillaInputGroupProps } from '@/components/InputGroup/index'
import { VanillaInputGroupClassesKeys, VanillaInputGroupConfig } from '@/components/InputGroup/index'
import VanillaFormLabel from '@/components/FormLabel/FormLabel.vue'

export default defineComponent({
    name: 'VanillaInputGroup',
    components: {
        VanillaFormLabel,
    },
    inheritAttrs: true,
    props: {
        ...useVariantProps<VanillaInputGroupProps>(),
        type: {
            type: [String] as PropType<string>,
            default: 'text',
        },
        label: {
            type: [String] as PropType<string>,
            default: undefined,
            required: false,
        },
        name: {
            type: [String, undefined] as PropType<string | undefined>,
            default: undefined,
            required: false,
        },
        layout: {
            type: [String, undefined] as PropType<'row' | 'inline' | 'content' | string | undefined>,
            default: 'row',
            required: false,
            validator: (layout: string) => {
                return ['row', 'inline', 'content'].includes(layout)
            },
        },
        withPadding: {
            type: [Boolean] as PropType<boolean>,
            default: true,
            required: false,
        },
    },
    setup(props) {
        const localType = ref(props.type)
        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', ref(null))

        const { configuration } = useConfigurationWithClassesList<VanillaInputGroupProps>(
            VanillaInputGroupConfig,
            VanillaInputGroupClassesKeys,
            localVariant,
        )

        return {
            configuration,
            localVariant,
            localType,
            localErrors,
            hasErrors,
            hasSlot,
        }
    },
})
</script>

<template>
  <!-- Inline - Label -> Input -->
  <div
    v-if="layout === 'inline'"
    :class="[
      configuration.classesList.inlineContainer,
      withPadding ? configuration.classesList.inlineWithPadding : '',
    ]"
  >
    <div
      v-if="hasSlot($slots.label) || label !== undefined"
      :class="[
        configuration.classesList.inlineLabel,
      ]"
    >
      <slot name="label">
        <VanillaFormLabel
          :label="label"
          :for="name"
        />
      </slot>
    </div>
    <div
      :class="[
        configuration.classesList.inlineInput,
      ]"
    >
      <slot
        v-bind="{ label, name, layout }"
      />
    </div>
  </div>

  <!-- Standard Label in a line, Input in a new line -->
  <div
    v-if="layout === 'row'"
    :class="[
      configuration.classesList.rowContainer,
      withPadding ? configuration.classesList.rowWithPadding : '',
    ]"
  >
    <slot name="label">
      <VanillaFormLabel
        v-if="label !== undefined"
        :label="label"
        :for="name"
      />
    </slot>
    <slot
      v-bind="{ label, name, layout }"
    />
  </div>

  <!-- Content Line centered -->
  <div
    v-if="layout === 'content'"
    :class="[
      configuration.classesList.contentContainer,
      withPadding ? configuration.classesList.contentWithPadding : '',
    ]"
  >
    <slot name="label">
      <VanillaFormLabel
        v-if=" label !== undefined"
        :label="label"
        :for="name"
      />
    </slot>
    <slot
      v-bind="{ label, name, layout }"
    />
  </div>
  <!-- No Styles Applied -->
  <div
    v-if="layout === undefined"
  >
    <slot name="label">
      <VanillaFormLabel
        v-if="label !== undefined"
        :label="label"
        :for="name"
      />
    </slot>
    <slot
      v-bind="{ label, name, layout }"
    />
  </div>
</template>

