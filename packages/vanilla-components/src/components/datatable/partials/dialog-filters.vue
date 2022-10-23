<script setup lang="ts">
import type { PropType, Ref } from 'vue'
import { ref, watch } from 'vue'
import find from 'lodash/find'
import type * as Types from '../config'
import { useInjectDatatableTranslations } from '../utils'
import Button from '@/components/button/button.vue'
import { useInjectsClassesList } from '@/core/use'
import { isEqual } from '@/core/helpers'
import TrashIcon from '@/components/icons/hero/outline/TrashIcon.vue'
import Dialog from '@/components/dialog/dialog.vue'
import Select from '@/components/select/select.vue'
import RichSelect from '@/components/rich-select/rich-select.vue'
import Checkbox from '@/components/checkbox/checkbox.vue'
import Toggle from '@/components/toggle/toggle.vue'
import Input from '@/components/input/input.vue'
import Textarea from '@/components/textarea/textarea.vue'
import DateTimeInput from '@/components/datetime-input/datetime-input.vue'
import InputGroup from '@/components/input-group/input-group.vue'

const props = defineProps({
  filters: {
    type: [Array] as PropType<Types.DatatableFilters>,
    required: true,
  },
  userSettings: {
    type: [Object] as PropType<Types.DatatableUserSettings>,
    required: true,
  },
})

const emit = defineEmits([
  'update:modelValue',
  'filtersSaved',
  'filtersReset',
])

const isOpen = ref(false) as Ref<boolean>
const localFilters = ref({}) as Ref<Types.DatatableSavedFilter>

// Once props changes, destruct the local filters value
watch(
  () => props.userSettings.filters,
  (newValue: Types.DatatableSavedFilter) => {
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
    return v != null && v !== '' && v !== getFilterDefaultValue(key)
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
</script>

<template>
  <Dialog
    v-model="isOpen"
    :title="translations.filters"
    :body-with-padding="true"
    as="form"
    size="medium"
    @submit.prevent="saveSettings"
  >
    <template
      v-for="(filter) in filters"
      :key="filter.name"
    >
      <InputGroup
        :label="filter.label"
        :name="filter.name"
        :layout="filter.layout || 'inline'"
      >
        <Select
          v-if="filter.component === 'VanillaSelect'"
          v-model="localFilters[filter.name]"
          :model-value="getFilterValue(filter.name) || null"
          :options="filter.options"
          v-bind="filter.props"
          :show-empty="true"
        />

        <RichSelect
          v-if="filter.component === 'VanillaRichSelect'"
          v-model="localFilters[filter.name]"
          :model-value="getFilterValue(filter.name) || null"
          :placeholder="filter.placeholder"
          :options="filter.options"
          v-bind="filter.props"
        />

        <Input
          v-if="filter.component === 'VanillaInput'"
          v-model="localFilters[filter.name]"
          :model-value="getFilterValue(filter.name) || null"
          :placeholder="filter.placeholder"
          v-bind="filter.props"
        />

        <Checkbox
          v-if="filter.component === 'VanillaCheckbox'"
          v-model="localFilters[filter.name]"
          :model-value="getFilterValue(filter.name) || null"
          :placeholder="filter.placeholder"
          v-bind="filter.props"
        />

        <Toggle
          v-if="filter.component === 'VanillaToggle'"
          v-model="localFilters[filter.name]"
          :model-value="getFilterValue(filter.name) || null"
          :placeholder="filter.placeholder"
          v-bind="filter.props"
        />

        <Textarea
          v-if="filter.component === 'VanillaTextarea'"
          v-model="localFilters[filter.name]"
          :model-value="getFilterValue(filter.name) || null"
          :placeholder="filter.placeholder"
          v-bind="filter.props"
        />

        <DateTimeInput
          v-if="filter.component === 'VanillaDatetimePicker'"
          v-model="localFilters[filter.name]"
          :model-value="getFilterValue(filter.name) || null"
          :placeholder="filter.placeholder"
          v-bind="filter.props"
        />
      </InputGroup>
    </template>

    <InputGroup variant="content">
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
    </InputGroup>

    <!-- Footer -->
    <template #footer>
      <Button
        tabindex="2"
        type="submit"
        :label="translations.filtersSaveAndClose"
      />
    </template>
  </Dialog>
</template>
