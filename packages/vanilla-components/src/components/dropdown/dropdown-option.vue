<script setup lang="ts">
  import type { Component, PropType } from 'vue'
  import { MenuItem } from '@headlessui/vue'
  import { useInjectsClassesList } from '../../core/use'

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
      type: [String, Object] as PropType<string | Component>,
      required: false,
      default: 'template',
    },
    withDefaultPadding: {
      type: [Boolean] as PropType<boolean>,
      required: false,
      default: true,
    },
  })

  const classesList = useInjectsClassesList()!

  /**
   * @docs
   * @displayName VanillaDropdownOption
   * @description A dropdown option menu component
   **/
</script>

<script lang="ts">
export default {
  name: 'VanillaDropdownOption',
  inheritAttrs: true,
}
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
