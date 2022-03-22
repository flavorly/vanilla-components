<template>
  <!-- Regular -->
  <VanillaDropdown
    v-model="isDropdownOpen"
    class="inline-flex"
  >
    <template #trigger="{iconClasses}">
      <VanillaButton variant="primary">
        <span v-text="textActions" />
        <span
          v-if="countSelected !== undefined"
          class="ml-1 text-xxs text-white xxs:hidden"
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
          v-bind="{selectAction}"
        >
          <span>{{ action.name }} - {{ action.slotName }}</span>
        </slot>
      </VanillaDropdownOption>
    </template>
  </VanillaDropdown>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/solid';
import { useDynamicSlots } from '@/core';
import VanillaDropdown from '@/components/Dropdown/Dropdown.vue';
import VanillaDropdownOption from '@/components/Dropdown/DropdownOption/DropdownOption.vue';
import VanillaButton from '@/components/Button/Button.vue';
import { VanillaDatatableActions } from '../index';

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
    setup(props, { emit }){

        const isDropdownOpen = ref(false);
        const selectAction = (action: object) => {
            emit('actionSelected', action);
        };

        return {
            isDropdownOpen,
            selectAction,
            useDynamicSlots,
        };
    },
});
</script>
