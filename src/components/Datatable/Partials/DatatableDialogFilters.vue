<script lang="ts">
import type { PropType, Ref } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import find from 'lodash/find'
import type {
    VanillaDatatableFilters,
    VanillaDatatableSavedFilter,
    VanillaDatatableUserSettings,
} from '../index'
import { useInjectDatatableTranslations } from '../utils'
import VanillaDialog from '@/components/Dialog/Dialog.vue'
import VanillaSelect from '@/components/Select/Select.vue'
import VanillaRichSelect from '@/components/RichSelect/RichSelect.vue'
import VanillaCheckbox from '@/components/Checkbox/Checkbox.vue'
import VanillaToggle from '@/components/Toggle/Toggle.vue'
import VanillaInput from '@/components/Input/Input.vue'
import VanillaTextarea from '@/components/Textarea/Textarea.vue'
import VanillaDatetimePicker from '@/components/DatetimePicker/DatetimePicker.vue'
import VanillaInputGroup from '@/components/InputGroup/InputGroup.vue'
import VanillaButton from '@/components/Button/Button.vue'
import { isEqual, useInjectsClassesList } from '@/core'
import TrashIcon from '@/components/Icons/Hero/Outline/TrashIcon.vue'

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
    setup(props, { emit }) {
        const isOpen = ref(false) as Ref<boolean>
        const localFilters = ref({}) as Ref<VanillaDatatableSavedFilter>

        // Once props changes, destruct the local filters value
        watch(
            () => props.userSettings.filters,
            (newValue) => {
                localFilters.value = { ...newValue }
            },
            { deep: true },
        )

        // Resolve the value for the filter
        const getFilterDefaultValue = (name: string): unknown => {
            return find(props.filters, { name })?.defaultValue || ''
        }

        // Resolve the value for the filter
        const getFilterProvidedValue = (name: string): unknown => {
            return find(props.filters, { name })?.value || ''
        }

        // Resolve the value for the filter
        const getFilterValue = (name: string): unknown => {
            return props.userSettings.filters[name] || getFilterProvidedValue(name) || getFilterDefaultValue(name)
        }

        // Cleanup empty filters on save
        const cleanupEmptyFilters = (filters: object) => {
            return Object.fromEntries(Object.entries(filters).filter(([key, v]) => {
                return v != null && v !== '' && v != getFilterDefaultValue(key)
            }))
        }

        // Save the settings & Emit when necessary
        const saveSettings = () => {
            isOpen.value = false
            if (Object.keys(localFilters).length > 0 && !isEqual(localFilters.value, props.userSettings.filters)) {
                localFilters.value = cleanupEmptyFilters(localFilters.value)
                emit('filtersSaved', { ...localFilters.value })
            }
        }

        // Reset Filters
        const resetSettings = () => {
            isOpen.value = false
            localFilters.value = {}
            emit('filtersReset', true)
        }

        // Open / Close Modal
        watch(isOpen, (val: boolean) => {
            emit('update:modelValue', val)
        })

        // Provide Translations
        const translations = useInjectDatatableTranslations()!
        const classesList = useInjectsClassesList('configuration_vanilla_datatable')!

        return {
            isOpen,
            localFilters,
            getFilterValue,
            saveSettings,
            resetSettings,
            translations,
            classesList,
        }
    },
})
</script>

<template>
  <VanillaDialog
    v-model="isOpen"
    :title="translations.filters"
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

        <VanillaRichSelect
          v-if="filter.component === 'VanillaRichSelect'"
          v-model="localFilters[filter.name]"
          :model-value="getFilterValue(filter.name) || null"
          :placeholder="filter.placeholder"
          :options="filter.options"
          v-bind="filter.props"
        />

        <VanillaInput
          v-if="filter.component === 'VanillaInput'"
          v-model="localFilters[filter.name]"
          :model-value="getFilterValue(filter.name) || null"
          :placeholder="filter.placeholder"
          v-bind="filter.props"
        />

        <VanillaCheckbox
          v-if="filter.component === 'VanillaCheckbox'"
          v-model="localFilters[filter.name]"
          :model-value="getFilterValue(filter.name) || null"
          :placeholder="filter.placeholder"
          v-bind="filter.props"
        />

        <VanillaToggle
          v-if="filter.component === 'VanillaToggle'"
          v-model="localFilters[filter.name]"
          :model-value="getFilterValue(filter.name) || null"
          :placeholder="filter.placeholder"
          v-bind="filter.props"
        />

        <VanillaTextarea
          v-if="filter.component === 'VanillaTextarea'"
          v-model="localFilters[filter.name]"
          :model-value="getFilterValue(filter.name) || null"
          :placeholder="filter.placeholder"
          v-bind="filter.props"
        />

        <VanillaDatetimePicker
          v-if="filter.component === 'VanillaDatetimePicker'"
          v-model="localFilters[filter.name]"
          :model-value="getFilterValue(filter.name) || null"
          :placeholder="filter.placeholder"
          v-bind="filter.props"
        />
      </VanillaInputGroup>
    </template>

    <VanillaInputGroup layout="content">
      <div :class="[classesList.genericFormsContentContainer]">
        <span
          :class="[classesList.genericFormsContentLink]"
          @click="resetSettings"
        >
          <TrashIcon :class="[classesList.genericFormsContentIcons]" />
          <span v-text="translations.filtersReset" />
        </span>
        <span v-text="translations.filtersResetOr" />
        <span
          :class="[classesList.genericFormsContentLink]"
          v-text="translations.filtersCopy"
        />
      </div>
    </VanillaInputGroup>

    <!-- Footer -->
    <template #footer>
      <VanillaButton
        tabindex="2"
        type="submit"
        :label="translations.filtersSaveAndClose"
      />
    </template>
  </VanillaDialog>
</template>
