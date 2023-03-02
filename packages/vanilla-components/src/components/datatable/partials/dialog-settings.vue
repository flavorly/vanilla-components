<script setup lang="ts">
import type { PropType, Ref } from 'vue'
import { computed, ref, watch } from 'vue'
import type * as Types from '../config'
import { useInjectDatatableTranslations } from '../utils'
import { useInjectsClassesList } from '../../../core/use'
import Dialog from '../../dialog/dialog.vue'
import Select from '../../select/select.vue'
import CheckboxGroup from '../../checkbox/checkbox-group.vue'
import Toggle from '../../toggle/toggle.vue'
import InputGroup from '../../input-group/input-group.vue'
import Button from '../../button/button.vue'
import FormSection from '../../forms/form-section.vue'
import TrashIcon from '~icons/heroicons/trash'

const props = defineProps({
  userSettings: {
    type: [Object] as PropType<Types.DatatableUserSettings>,
    required: true,
  },
  defaultSettings: {
    type: [Object] as PropType<Types.DatatableUserSettings>,
    required: true,
  },
  perPageOptions: {
    type: [Object, Array] as PropType<Types.DatatablePageOptions>,
    required: true,
  },
  columns: {
    type: [Array] as PropType<Types.DatatableColumnsComputed>,
    required: true,
  },
})

const emit = defineEmits([
  'update:modelValue',
  'update:settings',
  'settingsReset',
])

const isOpen = ref(false)
const localSettings = ref(props.userSettings) as Ref<Types.DatatableUserSettings>

// Normalize the columns with Label & Text
const columnsNormalized = computed(() => {
  const columns = [] as { text: string; value: string }[]
  props.columns.forEach((column: Types.DatatableColumnComputed) => {
    columns.push({
      text: column.label,
      value: column.name,
    })
  })
  return columns
})

// Save Settings
const saveSettings = () => {
  isOpen.value = false
  emit('update:settings', localSettings.value)
}

// Reset Settings
const resetSettings = () => {
  isOpen.value = false
  emit('settingsReset', true)
}

// Open / Close Modal
watch(isOpen, (val: boolean) => {
  emit('update:modelValue', val)
})

// Provide Translations
const translations = useInjectDatatableTranslations()!
const classesList = useInjectsClassesList('configuration_vanilla_datatable')!

defineOptions({
  name: 'VanillaDatatableSettingsDialog',
})
</script>

<template>
  <Dialog
    v-model="isOpen"
    :title="translations.settings"
    as="form"
    size="medium"
    :body-darker="true"
    @submit.prevent="saveSettings"
  >
    <FormSection divided>
      <InputGroup
        :label="translations.settingsItemsPerPage"
        name="perPage"
        variant="inline"
      >
        <Select
          v-model="localSettings.perPage"
          :options="perPageOptions"
          :placeholder="translations.selectOption"
        />
      </InputGroup>

      <InputGroup
        :label="translations.settingsVisibility"
        name="hiddenColumns"
      >
        <CheckboxGroup
          v-model="localSettings.hiddenColumns"
          :options="columnsNormalized"
        />
      </InputGroup>

      <InputGroup
        :label="translations.settingsItemsPerPage"
        name="useStorage"
        variant="inline"
      >
        <Toggle
          v-model="localSettings.useStorage"
        />
      </InputGroup>

      <InputGroup
        :label="translations.settingsPersistSelection"
        name="saveSelection"
        variant="inline"
      >
        <Toggle
          v-model="localSettings.saveSelection"
        />
      </InputGroup>

      <InputGroup
        variant="content"
        with-padding
      >
        <span
          :class="[classesList.genericFormsContentContainer]"
          @click="resetSettings"
        >
          <TrashIcon :class="[classesList.genericFormsContentIcons]" />
          <span v-text="translations.settingsReset" />
        </span>
      </InputGroup>
    </FormSection>

    <!-- Footer -->
    <template #footer>
      <Button
        tabindex="2"
        type="submit"
        :label="translations.settingsSaveAndClose"
      />
    </template>
  </Dialog>
</template>
