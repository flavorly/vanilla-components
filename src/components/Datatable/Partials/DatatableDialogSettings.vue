<template>
  <VanillaDialog
    v-model="isOpen"
    :title="translations.settings"
    as="form"
    size="medium"
    @submit.prevent="saveSettings"
  >
    <VanillaInputGroup
      :label="translations.settingsItemsPerPage"
      name="perPage"
      layout="inline"
    >
      <VanillaSelect
        v-model="localSettings.perPage"
        :options="perPageOptions"
      />
    </VanillaInputGroup>

    <VanillaInputGroup
      :label="translations.settingsItemsPerPage"
      name="visibleColumns"
      layout="inline"
    >
      <VanillaCheckboxGroup
        v-model="localSettings.visibleColumns"
        :options="columnsNormalized"
      />
    </VanillaInputGroup>

    <VanillaInputGroup
      :label="translations.settingsItemsPerPage"
      name="useStorage"
      layout="inline"
    >
      <VanillaToggle
        v-model="localSettings.useStorage"
      />
    </VanillaInputGroup>

    <VanillaInputGroup
      :label="translations.settingsPersistSelection"
      name="saveSelection"
      layout="inline"
    >
      <VanillaToggle
        v-model="localSettings.saveSelection"
      />
    </VanillaInputGroup>

    <VanillaInputGroup layout="content">
      <span
        :class="[classesList.genericFormsContentContainer]"
        @click="resetSettings"
      >
        <TrashIcon :class="[classesList.genericFormsContentIcons]" />
        <span v-text="translations.settingsReset" />
      </span>
    </VanillaInputGroup>

    <!-- Footer -->
    <template #footer>
      <VanillaButton
        tabindex="2"
        type="submit"
        :label="translations.settingsSaveAndClose"
      />
    </template>
  </VanillaDialog>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref, watch } from 'vue';
import VanillaDialog from '@/components/Dialog/Dialog.vue';
import VanillaSelect from '@/components/Select/Select.vue';
import VanillaCheckboxGroup from '@/components/Checkbox/CheckboxGroup.vue';
import VanillaToggle from '@/components/Toggle/Toggle.vue';
import VanillaInputGroup from '@/components/InputGroup/InputGroup.vue';
import VanillaButton from '@/components/Button/Button.vue';
import {
    VanillaDatatableColumnComputed,
    VanillaDatatableColumnsComputed,
    VanillaDatatablePageOptions,
    VanillaDatatableUserSettings,
} from '../index';
import { TrashIcon } from '@heroicons/vue/24/outline/index.js';
import { useInjectDatatableTranslations } from '../utils';
import { useInjectsClassesList } from '@/core';

export default defineComponent({
    name: 'VanillaDatatableDialogSettings',
    components: {
        VanillaDialog,
        VanillaSelect,
        VanillaCheckboxGroup,
        VanillaToggle,
        VanillaInputGroup,
        VanillaButton,
        TrashIcon,
    },
    props: {
        userSettings: {
            type: [Object] as PropType<VanillaDatatableUserSettings>,
            required: true,
        },
        defaultSettings: {
            type: [Object] as PropType<VanillaDatatableUserSettings>,
            required: true,
        },
        perPageOptions: {
            type: [Object] as PropType<VanillaDatatablePageOptions>,
            required: true,
        },
        columns: {
            type: [Array] as PropType<VanillaDatatableColumnsComputed>,
            required: true,
        },
    },
    emits: [
        'update:modelValue',
        'update:settings',
        'settingsReset',
    ],
    setup(props, { emit }) {

        const isOpen = ref(false);
        const localSettings = ref(props.userSettings) as Ref<VanillaDatatableUserSettings>;

        // Normalize the columns with Label & Text
        const columnsNormalized = computed(() => {
            let columns = [] as { text: string, value: string }[];
            props.columns.forEach((column: VanillaDatatableColumnComputed) => {
                columns.push({
                    text: column.label,
                    value: column.name,
                });
            });
            return columns;
        });

        // Save Settings
        const saveSettings = () => {
            isOpen.value = false;
            emit('update:settings', localSettings.value);
        };

        // Reset Settings
        const resetSettings = () => {
            isOpen.value = false;
            emit('settingsReset', true);
        };

        // Open / Close Modal
        watch(isOpen, (val: boolean) => {
            emit('update:modelValue', val);
        });

        // Provide Translations
        const translations = useInjectDatatableTranslations()!;
        const classesList = useInjectsClassesList('configuration_vanilla_datatable')!;

        return {
            isOpen,
            localSettings,
            columnsNormalized,
            saveSettings,
            resetSettings,
            translations,
            classesList,
        };
    },
});
</script>
