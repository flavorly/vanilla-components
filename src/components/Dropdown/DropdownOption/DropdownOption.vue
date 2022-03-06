<template>
  <MenuItem
    v-slot="{ active }"
    as="div"
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
    name: 'VanillaDropdownOption',
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
    },
    setup(props){
        const classesList = useInjectsClassesList()!;

        return {
            classesList,
        };
    },
});
</script>
