<template>
  <VanillaDialog
    v-model="isOpen"
    title="Filters"
    as="form"
    size="medium"
    @submit.prevent="saveSettings"
  >
    <template
      v-for="(filter) in filters"
      :key="filter.name"
    >
      <VanillaInputGroup
        :label="filter.label"
        :name="filter.name"
        :layout="filter.layout || 'inline'"
      >
        <VanillaSelect
          v-if="filter.component === 'VanillaSelect'"
          v-model="localFilters[filter.name]"
          :options="filter.options"
          v-bind="filter.props"
          :show-empty="true"
        />

        <VanillaInput
          v-if="filter.component === 'VanillaInput'"
          v-model="localFilters[filter.name]"
          :placeholder="filter.placeholder"
          v-bind="filter.props"
        />
      </VanillaInputGroup>
    </template>


    <VanillaInputGroup layout="content">
      <div class="form-content">
        <div class="flex items-center justify-center space-x-1 text-xs select-none">
          <span class="underline flex items-center justify-center space-x-1"> <TrashIcon class="h-4 w-4" />{{ 'Reset Filters' }}</span>
          <span>{{ 'or' }}</span>
          <span class="underline flex items-center justify-center space-x-1"> {{ 'Copy Link' }}</span>
        </div>
      </div>
    </VanillaInputGroup>

    <!-- Footer -->
    <template #footer>
      <VanillaButton
        tabindex="2"
        type="submit"
        :label="'Save & Close'"
      />
    </template>
  </VanillaDialog>
</template>
<script lang="ts">
import { defineComponent, PropType, Ref, ref, watch } from 'vue';

import VanillaDialog from '@/components/Dialog/Dialog.vue';
import VanillaSelect from '@/components/Select/Select.vue';
import VanillaRichSelect from '@/components/RichSelect/RichSelect.vue';
import VanillaCheckbox from '@/components/Checkbox/Checkbox.vue';
import VanillaToggle from '@/components/Toggle/Toggle.vue';
import VanillaInput from '@/components/Input/Input.vue';
import VanillaTextarea from '@/components/Textarea/Textarea.vue';
import VanillaDatetimePicker from '@/components/DatetimePicker/DatetimePicker.vue';
import VanillaInputGroup from '@/components/InputGroup/InputGroup.vue';
import VanillaButton from '@/components/Button/Button.vue';
import { VanillaDatatableFilters, VanillaDatatableSavedFilters, VanillaDatatableUserSettings } from '../index';
import { TrashIcon } from '@heroicons/vue/outline';

export default defineComponent({
    name: 'VanillaDatatableDialogFilters',
    components: {
        VanillaDialog,
        VanillaSelect,
        VanillaRichSelect,
        VanillaCheckbox,
        VanillaToggle,
        VanillaInput,
        VanillaTextarea,
        VanillaInputGroup,
        VanillaDatetimePicker,
        VanillaButton,
        TrashIcon,
    },
    props: {
        filters: {
            type: [Array] as PropType<VanillaDatatableFilters>,
            required: true,
        },
        userSettings: {
            type: [Object] as PropType<VanillaDatatableUserSettings>,
            required: true,
        },
    },
    emits: [
        'update:modelValue',
        'update:filters',
        'filtersReset',
    ],
    setup(props, { emit }){

        const isOpen = ref(false);

        const localFilters = ref({}) as Ref<VanillaDatatableSavedFilters>;
        const localSettings = ref(props.userSettings) as Ref<VanillaDatatableUserSettings>;

        //console.log('Settings from filters', localSettings.value);

        const saveSettings = () => {
            isOpen.value = false;
            emit('update:filters', localFilters.value);
        };

        const resetSettings = () => {
            isOpen.value = false;
            emit('filtersReset', true);
        };

        watch(isOpen, (val: boolean) => {
            emit('update:modelValue', val);
        });

        return {
            isOpen,
            localFilters,
            localSettings,
            saveSettings,
            resetSettings,
        };
    },
});
</script>
