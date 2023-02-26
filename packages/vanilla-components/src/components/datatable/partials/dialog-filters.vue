<script setup lang="ts">
import type { PropType, Ref } from 'vue'
import { camelize, defineAsyncComponent, inject, ref, watch } from 'vue'
import find from 'lodash/find'
import { useClipboard } from '@vueuse/core'
import type * as Types from '../config'
import { useInjectDatatableTranslations } from '../utils'
import { useInjectsClassesList } from '../../../core/use'
import { Base64, isEqual, isServer, urlHelper } from '../../../core/helpers'
import Button from '../../button/button.vue'
import TrashIcon from '../../icons/hero/outline/TrashIcon.vue'
import Dialog from '../../dialog/dialog.vue'
import InputGroup from '../../input-group/input-group.vue'
import FormSection from '../../forms/form-section.vue'
import ClipboardIcon from '../../icons/hero/outline/ClipboardIcon.vue'
import CheckIcon from '../../icons/hero/solid/CheckIcon.vue'

const props = defineProps({
  filters: {
    type: [Array] as PropType<Types.DatatableFilters>,
    required: true,
  },
  userSettings: {
    type: [Object] as PropType<Types.DatatableUserSettings>,
    required: true,
  },
  configuration: {
    type: [Object] as PropType<Types.DatatableConfiguration>,
    required: true,
  },
})
const emit = defineEmits([
  'update:modelValue',
  'filtersSaved',
  'filtersReset',
])

// Components Async
const Select = defineAsyncComponent(() => import('../../select/select.vue'))
const RichSelect = defineAsyncComponent(() => import('../../rich-select/rich-select.vue'))
const Checkbox = defineAsyncComponent(() => import('../../checkbox/checkbox.vue'))
const Toggle = defineAsyncComponent(() => import('../../toggle/toggle.vue'))
const VanillaInput = defineAsyncComponent(() => import('../../input/input.vue'))
const Textarea = defineAsyncComponent(() => import('../../textarea/textarea.vue'))
const DateTimeInput = defineAsyncComponent(() => import('../../datetime-input/datetime-input.vue'))

const isOpen = ref(false) as Ref<boolean>
const localFilters = ref({}) as Ref<Types.DatatableSavedFilter>
const resetUrl = inject('datatable_reset_url_function') as Function

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
  return find(props.filters, { name })?.defaultValue || null
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
    if (v === null && v === '') {
      return false
    }
    if (Array.isArray(v) && v.length <= 0) {
      return false
    }
    if (typeof v === 'object' && Object.keys(v).length <= 0) {
      return false
    }
    return v !== getFilterDefaultValue(key)
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
const resetFilters = () => {
  isOpen.value = false
  localFilters.value = {}
  resetUrl()
  emit('filtersReset', true)
}

// Copy Filters Link
const { text, copy, copied, isSupported } = useClipboard()

const copyFiltersLink = (): void => {
  if (isServer()) {
    return
  }
  const filtersKey = camelize(`${props.configuration.name}`)
  const query = {
    [filtersKey]: props.configuration.options.filtersHashingMethod === 'query'
      ? localFilters.value
      : Base64.encode(JSON.stringify(localFilters.value)),
  }

  const finalUrl = urlHelper(window.location.href, query)
  copy(finalUrl)
}

// Open / Close Modal
watch(isOpen, (val: boolean) => {
  emit('update:modelValue', val)
})

// Provide Translations
const translations = useInjectDatatableTranslations()!
const classesList = useInjectsClassesList('configuration_vanilla_datatable')!

defineOptions({
  name: 'VanillaDatatableFiltersDialog',
})
</script>

<template>
  <Dialog
    v-model="isOpen"
    :title="translations.filters"
    :body-darker="true"
    as="form"
    size="medium"
    @submit.prevent="saveSettings"
  >
    <FormSection divided>
      <template
        v-for="(filter) in filters"
        :key="filter.name"
      >
        <InputGroup
          :label="filter.label"
          :name="filter.name"
          :variant="filter.layout || 'inline'"
        >
          <Select
            v-if="filter.component === 'VanillaSelect'"
            v-model="localFilters[filter.name]"
            :options="filter.options"
            v-bind="filter?.props"
            :show-empty="true"
            :feedback="filter?.feedback"
            :errors="filter?.errors"
          />

          <RichSelect
            v-if="filter.component === 'VanillaRichSelect'"
            v-model="localFilters[filter.name]"
            :placeholder="filter?.placeholder"
            :fetch-endpoint="filter?.fetchEndpoint"
            :value-attribute="filter?.valueAttribute"
            :text-attribute="filter?.textAttribute"
            :options="filter.options"
            :feedback="filter?.feedback"
            :errors="filter?.errors"
            v-bind="filter?.props"
            :teleport="true"
            :multiple="filter?.multiple"
          />

          <VanillaInput
            v-if="filter.component === 'VanillaInput'"
            v-model="localFilters[filter.name]"
            :placeholder="filter?.placeholder"
            v-bind="filter?.props"
            :feedback="filter?.feedback"
            :errors="filter?.errors"
          />

          <Checkbox
            v-if="filter.component === 'VanillaCheckbox'"
            v-model="localFilters[filter.name]"
            :placeholder="filter?.placeholder"
            v-bind="filter?.props"
            :feedback="filter?.feedback"
            :errors="filter?.errors"
          />

          <Toggle
            v-if="filter.component === 'VanillaToggle'"
            v-model="localFilters[filter.name]"
            :placeholder="filter?.placeholder"
            v-bind="filter?.props"
            :feedback="filter?.feedback"
            :errors="filter?.errors"
          />

          <Textarea
            v-if="filter.component === 'VanillaTextarea'"
            v-model="localFilters[filter.name]"
            :placeholder="filter?.placeholder"
            v-bind="filter?.props"
            :feedback="filter?.feedback"
            :errors="filter?.errors"
          />

          <DateTimeInput
            v-if="filter.component === 'VanillaDatetimePicker'"
            v-model="localFilters[filter.name]"
            :placeholder="filter?.placeholder"
            v-bind="filter?.props"
            :feedback="filter?.feedback"
            :errors="filter?.errors"
          />
        </InputGroup>
      </template>

      <InputGroup variant="content">
        <div :class="[classesList.genericFormsContentContainer]">
          <span
            :class="[classesList.genericFormsContentLink]"
            @click="resetFilters"
          >
            <TrashIcon :class="[classesList.genericFormsContentIcons]" />
            <span v-text="translations.filtersReset" />
          </span>
          <span v-text="translations.filtersResetOr" />
          <ClipboardIcon
            v-if="!copied"
            :class="[classesList.genericFormsContentIcons]"
          />
          <CheckIcon
            v-if="copied"
            :class="[classesList.genericFormsContentIcons]"
          />
          <span
            v-if="!copied"
            :class="[classesList.genericFormsContentLink]"
            @click="copyFiltersLink"
            v-text="translations.filtersCopy"
          />
          <span
            v-if="copied"
            :class="[classesList.genericFormsContentLink]"
            @click="copyFiltersLink"
            v-text="translations.filtersCopied"
          />
        </div>
      </InputGroup>
    </FormSection>

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
