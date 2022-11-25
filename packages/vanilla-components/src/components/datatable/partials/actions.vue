<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import type * as Types from '../config'
import { useInjectDatatableTranslations } from '../utils'
import { useInjectsClassesList } from '@/core/use'
import Dropdown from '@/components/dropdown/dropdown-menu.vue'
import DropdownOption from '@/components/dropdown/dropdown-option.vue'
import Button from '@/components/button/button.vue'
import ChevronDownIcon from '@/components/icons/hero/solid/ChevronDownIcon.vue'

const props = defineProps({
  actions: {
    type: [Array, Object] as PropType<Types.DatatableActionsType>,
    required: true,
  },
  countSelected: {
    type: [String, Number, undefined] as PropType<string | number | undefined>,
    default: undefined,
  },
  textActions: {
    type: [String] as PropType<string>,
    default: 'Actions',
  },
})

const emit = defineEmits(['actionSelected'])

const isDropdownOpen = ref(false)
const selectAction = (action: object) => {
  emit('actionSelected', action)
}

// Provide Translations
const translations = useInjectDatatableTranslations()!
const classesList = useInjectsClassesList('configuration_vanilla_datatable')!

defineOptions({
  name: 'VanillaDatatableActions',
})
</script>

<template>
  <!-- Regular -->
  <Dropdown
    v-model="isDropdownOpen"
    :class="[classesList.actionsContainer]"
  >
    <template #trigger="{ iconClasses }">
      <Button :variant="classesList.actionsButtonVariant">
        <span v-text="translations.actionsButton" />
        <span
          v-if="countSelected !== undefined"
          :class="[classesList.actionsButtonCount]"
        >( {{ countSelected }} )</span>
        <ChevronDownIcon
          :class="iconClasses"
          aria-hidden="true"
        />
      </Button>
    </template>
    <template
      v-for="(action) in actions"
      :key="action.name"
    >
      <!-- Option -->
      <DropdownOption @click="selectAction(action)">
        <slot
          :name="action.slotName"
          v-bind="{ selectAction }"
        >
          <span>{{ action.label }}</span>
        </slot>
      </DropdownOption>
    </template>
  </Dropdown>
</template>
