<template>
  <VanillaDialog
    v-model="isOpen"
    title="Settings"
    as="form"
    size="medium"
    @submit.prevent="saveSettings"
  >
    <VanillaInputGroup
      label="Items p/ Page"
      name="perPage"
      layout="inline"
    >
      <VanillaSelect
        v-model="localSettings.perPage"
        :options="perPageOptions"
      />
    </VanillaInputGroup>

    <VanillaInputGroup
      label="Visibility"
      name="visibleColumns"
      layout="inline"
    >
      <VanillaCheckboxGroup
        v-model="localSettings.visibleColumns"
        :options="columnsNormalized"
      />
    </VanillaInputGroup>

    <VanillaInputGroup
      label="Persist Settings"
      name="useStorage"
      layout="inline"
    >
      <VanillaToggle
        v-model="localSettings.useStorage"
      />
    </VanillaInputGroup>

    <VanillaInputGroup
      label="Persist Selection"
      name="saveSelection"
      layout="inline"
    >
      <VanillaToggle
        v-model="localSettings.saveSelection"
      />
    </VanillaInputGroup>

    <VanillaInputGroup layout="content">
      <span
        class="flex items-center justify-center space-x-1 text-xs"
        @click="resetSettings"
      >
        <TrashIcon class="h-4 w-4" />
        <span>{{ 'Reset Default Settings' }}</span>
      </span>
    </VanillaInputGroup>

    <!-- Footer -->
    <template #footer>
      <VanillaButton
        tabindex="2"
        type="submit"
        :label="'Close'"
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
import { TrashIcon } from '@heroicons/vue/outline';

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
    setup(props, { emit }){

        const isOpen = ref(false);
        const localSettings = ref(props.userSettings) as Ref<VanillaDatatableUserSettings>;

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

        const saveSettings = () => {
            isOpen.value = false;
            emit('update:settings', localSettings.value);
        };

        const resetSettings = () => {
            isOpen.value = false;
            emit('settingsReset', true);
        };

        watch(isOpen, (val: boolean) => {
            emit('update:modelValue', val);
        });

        return {
            isOpen,
            localSettings,
            columnsNormalized,
            saveSettings,
            resetSettings,
        };
    },
});
</script>
