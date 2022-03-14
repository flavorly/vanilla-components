<template>
  <MenuItem
    v-slot="{ active }"
    :as="as"
    :disabled="disabled"
  >
    <button
      :class="[
        classesList.menuItem,
        active ? classesList.menuItemHighlighted : classesList.menuItemNotHighlighted
      ]"
    >
      <slot v-bind="{ active }">
        <span v-text="text" />
      </slot>
    </button>
  </MenuItem>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useInjectsClassesList } from '@/core';
import { MenuItem } from '@headlessui/vue';

export default defineComponent({
    name: 'VanillaDatatableOption',
    compatConfig: {
        MODE: 3,
    },
    components: {
        MenuItem,
    },
    props: {
        text: {
            type: [String] as PropType<string>,
            required: false,
            default: undefined,
        },
        disabled: {
            type: [Boolean] as PropType<boolean>,
            required: false,
            default: false,
        },
        as: {
            type: [String] as PropType<string>,
            required: false,
            default: 'div',
        },
    },
    setup(props){
        const classesList = useInjectsClassesList()!;

        return {
            classesList,
        };
    },
});
</script>
