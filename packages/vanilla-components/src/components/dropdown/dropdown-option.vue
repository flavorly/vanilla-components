<script setup lang="ts">
  import type { PropType } from 'vue'
  import { MenuItem } from '@headlessui/vue'
  import { useInjectsClassesList } from '@/core/use'

  const props = defineProps({
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
      default: 'template',
    },
    withDefaultPadding: {
      type: [Boolean] as PropType<boolean>,
      required: false,
      default: false,
    },
  })

  const classesList = useInjectsClassesList()!
</script>

<template>
  <MenuItem
    v-slot="{ active }"
    :as="as"
    :disabled="disabled"
  >
    <div
      :class="[
        classesList.menuItem,
        withDefaultPadding ? classesList.menuItemSpacing : '',
        active ? classesList.menuItemHighlighted : classesList.menuItemNotHighlighted,
      ]"
    >
      <slot
        v-bind="{
          active,
          classes: classesList.menuItemSpacing,
        }"
      >
        <span v-text="text" />
      </slot>
    </div>
  </MenuItem>
</template>
