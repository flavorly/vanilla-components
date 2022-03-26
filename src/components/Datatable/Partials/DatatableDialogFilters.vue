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
          :model-value="getFilterValue(filter.name) || null"
          :options="filter.options"
          v-bind="filter.props"
          :show-empty="true"
        />

        <VanillaInput
          v-if="filter.component === 'VanillaInput'"
          v-model="localFilters[filter.name]"
          :model-value="getFilterValue(filter.name) || null"
          :placeholder="filter.placeholder"
        />
      </VanillaInputGroup>
    </template>


    <VanillaInputGroup layout="content">
      <div class="form-content">
        <div class="flex items-center justify-center space-x-1 text-xs select-none">
          <span
            class="underline flex items-center justify-center space-x-1"
            @click="resetSettings"
          >
            <TrashIcon class="h-4 w-4" />{{ 'Reset Filters' }}
          </span>
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
import {
    VanillaDatatableFilters,
    VanillaDatatableSavedFilter,
    VanillaDatatableUserSettings,
} from '../index';
import { TrashIcon } from '@heroicons/vue/outline';
import find from 'lodash/find';
import { isEqual } from '@/core';

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
        'filtersSaved',
        'filtersReset',
    ],
    setup(props, { emit }){

        const isOpen = ref(false) as Ref<boolean>;
        const localFilters = ref({}) as Ref<VanillaDatatableSavedFilter>;

        // Once props changes, destruct the local filters value
        watch(
            () => props.userSettings.filters,
            (newValue) => {
                localFilters.value = { ...newValue };
            },
            { deep: true },
        );

        // Resolve the value for the filter
        const getFilterDefaultValue = (name: string): unknown => {
            return find(props.filters, { name: name })?.defaultValue || '';
        };

        // Resolve the value for the filter
        const getFilterProvidedValue = (name: string): unknown => {
            return find(props.filters, { name: name })?.value || '';
        };

        // Resolve the value for the filter
        const getFilterValue = (name: string): unknown => {
            return props.userSettings.filters[name] || getFilterProvidedValue(name) || getFilterDefaultValue(name);
        };

        // Cleanup empty filters on save
        const cleanupEmptyFilters = (filters: object) => {
            return Object.fromEntries(Object.entries(filters).filter(([key, v]) => {
                console.log('🛰️ filtering before submit', key, v, getFilterDefaultValue(key));
                return v != null && v !== '' && v != getFilterDefaultValue(key);
            }));
        };

        // Save the settings & Emit when necessary
        const saveSettings = () => {
            isOpen.value = false;
            if (Object.keys(localFilters).length > 0 && !isEqual(localFilters.value, props.userSettings.filters)){
                localFilters.value = cleanupEmptyFilters(localFilters.value);
                emit('filtersSaved',  { ...localFilters.value });
            }
        };

        // Reset Locall
        const resetSettings = () => {
            isOpen.value = false;
            localFilters.value = {};
            emit('filtersReset', true);
        };

        watch(isOpen, (val: boolean) => {
            emit('update:modelValue', val);
        });

        return {
            isOpen,
            localFilters,
            getFilterValue,
            saveSettings,
            resetSettings,
        };
    },
});
</script>
