<template>
  <!-- Inline - Label -> Input -->
  <div
    v-if="layout === 'inline'"
    class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-6 py-5"
  >
    <div
      v-if="hasSlot($slots.label) || label !== undefined"
      class="flex items-center text-sm leading-3 font-medium text-gray-500 dark:text-white"
    >
      <slot name="label">
        <VanillaFormLabel
          :label="label"
          :for="name"
        />
      </slot>
    </div>
    <div
      class="text-sm leading-5 sm:col-span-2 mt-2 sm:mt-0"
      v-bind="$attrs"
    >
      <slot
        v-bind="{label,name,layout}"
      />
    </div>
  </div>

  <!-- Standard Label in a line, Input in a new line -->
  <div
    v-if="layout === 'row'"
    class="px-6 py-3 mt-0 grid space-y-2"
  >
    <slot name="label">
      <VanillaFormLabel
        v-if="label !== undefined"
        :label="label"
        :for="name"
      />
    </slot>
    <slot
      v-bind="{label,name,layout}"
    />
  </div>

  <!-- Content Line centered -->
  <div
    v-if="layout === 'content'"
    class="px-6 py-3 sm:mt-0 sm:grid"
  >
    <slot name="label">
      <VanillaFormLabel
        v-if=" label !== undefined"
        :label="label"
        :for="name"
      />
    </slot>
    <slot
      v-bind="{label,name,layout}"
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
      v-bind="{label,name,layout}"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useBootVariant, useVariantProps, useConfigurationWithClassesList, hasSlot } from '@/core';
import { VanillaInputGroupProps, VanillaInputGroupClassesKeys, VanillaInputGroupConfig } from '@/components/InputGroup/index';
import VanillaFormLabel from '@/components/FormLabel/FormLabel.vue';

export default defineComponent({
    name: 'VanillaInputGroup',
    components: {
        VanillaFormLabel,
    },
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
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
            type: [String, undefined] as PropType<string | undefined>,
            default: 'inline',
            required: false,
            validator: (layout: string) => {
                return ['row', 'inline', 'content', undefined].includes(layout);
            },
        },
    },
    setup(props) {
        const localType = ref(props.type);
        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', ref(null));

        const { configuration } = useConfigurationWithClassesList<VanillaInputGroupProps>(
            VanillaInputGroupConfig,
            VanillaInputGroupClassesKeys,
            localVariant,
        );

        return {
            configuration,
            localVariant,
            localType,
            localErrors,
            hasErrors,
            hasSlot,
        };
    },
});
</script>

