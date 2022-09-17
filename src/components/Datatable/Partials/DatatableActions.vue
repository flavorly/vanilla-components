<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import type { VanillaDatatableActions } from '../index'
import { useInjectDatatableTranslations } from '../utils'
import { useDynamicSlots, useInjectsClassesList } from '@/core'
import VanillaDropdown from '@/components/Dropdown/Dropdown.vue'
import VanillaDropdownOption from '@/components/Dropdown/DropdownOption/DropdownOption.vue'
import VanillaButton from '@/components/Button/Button.vue'
import ChevronDownIcon from '@/components/Icons/Hero/Solid/ChevronDownIcon.vue'

export default defineComponent({
    name: 'VanillaDatatableActions',
    components: {
        ChevronDownIcon,
        VanillaButton,
        VanillaDropdown,
        VanillaDropdownOption,
    },
    props: {
        actions: {
            type: [Array, Object] as PropType<VanillaDatatableActions>,
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
    },
    emits: ['actionSelected'],
    setup(props, { emit }) {
        const isDropdownOpen = ref(false)
        const selectAction = (action: object) => {
            emit('actionSelected', action)
        }

        // Provide Translations
        const translations = useInjectDatatableTranslations()!

        const classesList = useInjectsClassesList('configuration_vanilla_datatable')!

        return {
            isDropdownOpen,
            selectAction,
            useDynamicSlots,
            translations,
            classesList,
        }
    },
})
</script>

<template>
  <!-- Regular -->
  <VanillaDropdown
    v-model="isDropdownOpen"
    :class="[classesList.actionsContainer]"
  >
    <template #trigger="{ iconClasses }">
      <VanillaButton :variant="classesList.actionsButtonVariant">
        <span v-text="translations.actionsButton" />
        <span
          v-if="countSelected !== undefined"
          :class="[classesList.actionsButtonCount]"
        >( {{ countSelected }} )</span>
        <ChevronDownIcon
          :class="iconClasses"
          aria-hidden="true"
        />
      </VanillaButton>
    </template>
    <template
      v-for="(action) in actions"
      :key="action.name"
    >
      <!-- Option -->
      <VanillaDropdownOption @click="selectAction(action)">
        <slot
          :name="action.slotName"
          v-bind="{ selectAction }"
        >
          <span>{{ action.name }}</span>
        </slot>
      </VanillaDropdownOption>
    </template>
  </VanillaDropdown>
</template>
