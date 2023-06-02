export { default as Alert, default as VanillaAlert } from './components/alert/alert.vue'

export { default as Avatar, default as VanillaAvatar } from './components/avatar/avatar.vue'

export { default as Button, default as VanillaButton } from './components/button/button.vue'

export { default as Card, default as VanillaCard } from './components/card/card.vue'
export { default as CardFooter, default as VanillaCardFooter } from './components/card/card-footer.vue'
export { default as CardEmpty, default as VanillaCardEmpty } from './components/card/card-empty.vue'

export { default as Checkbox, default as VanillaCheckbox } from './components/checkbox/checkbox.vue'
export { default as CheckboxGroup, default as VanillaCheckboxGroup } from './components/checkbox/checkbox-group.vue'

export { default as CountryInput, default as VanillaCountryInput } from './components/country-input/country-input.vue'
export { default as CountryInputOption, default as VanillaCountryInputOption } from './components/country-input/country-input.vue'

export { default as Datatable, default as VanillaDatatable } from './components/datatable/datatable.vue'
export { default as DatatableActions, default as VanillaDatatableActions } from './components/datatable/partials/actions.vue'
export { default as DatatableDialogConfirmAction, default as VanillaDatatableDialogConfirmAction } from './components/datatable/partials/dialog-confirm-action.vue'
export { default as DatatableDialogFilters, default as VanillaDatatableDialogFilters } from './components/datatable/partials/dialog-filters.vue'
export { default as DatatableDialogSettings, default as VanillaDatatableDialogSettings } from './components/datatable/partials/dialog-settings.vue'
export { default as DatatableFilterBadge, default as VanillaDatatableFilterBadge } from './components/datatable/partials/filter-badge.vue'
export { default as DatatableHead, default as VanillaDatatableHead } from './components/datatable/partials/head.vue'
export { default as DatatablePagination, default as VanillaDatatablePagination } from './components/datatable/partials/pagination.vue'
export { default as DatatableRowSkeleton, default as VanillaDatatableRowSkeleton } from './components/datatable/partials/row-skeleton.vue'
export { default as DatatableSearchBar, default as VanillaDatatableSearchBar } from './components/datatable/partials/search-bar.vue'

export { default as DateTimeInput, default as VanillaDateTimeInput } from './components/datetime-input/datetime-input.vue'

export { default as Dialog, default as VanillaDialog } from './components/dialog/dialog.vue'
export { default as DialogFooter, default as VanillaDialogFooter } from './components/dialog/partials/footer.vue'

export { default as DropdownMenu, default as VanillaDropdownMenu } from './components/dropdown/dropdown-menu.vue'
export { default as DropdownOption, default as VanillaDropdownOption } from './components/dropdown/dropdown-option.vue'
export { default as Dropdown, default as VanillaDropdown } from './components/dropdown/dropdown.vue'

export { default as FormErrors, default as VanillaFormErrors } from './components/forms/form-errors.vue'
export { default as FormFeedback, default as VanillaFormFeedback } from './components/forms/form-feedback.vue'
export { default as FormLabel, default as VanillaFormLabel } from './components/forms/form-label.vue'
export { default as FormSection, default as VanillaFormSection } from './components/forms/form-section.vue'

export { default as IconFlag, default as VanillaIconFlag } from './components/icons/flag.vue'

export { default as Input, default as VanillaInput } from './components/input/input.vue'
export { default as InputGroup, default as VanillaInputGroup } from './components/input-group/input-group.vue'

export { default as Fragment, default as VanillaFragment } from './components/misc/fragment.vue'
export { default as Transitionable, default as VanillaTransitionable } from './components/misc/transitionable.vue'
export { default as ClientOnly, default as VanillaClientOnly } from './components/misc/client-only.vue'

export { default as PhoneInput, default as VanillaPhoneInput } from './components/phone-input/phone-input.vue'

export { default as RichRadio, default as VanillaRichRadio } from './components/rich-radio/rich-radio.vue'
export { default as RichRadioOption, default as VanillaRichRadioOption } from './components/rich-radio-option/rich-radio-option.vue'

export { default as RichSelect, default as VanillaRichSelect } from './components/rich-select/rich-select.vue'
export { default as RichSelectOptionImage, default as VanillaRichSelectOptionImage } from './components/rich-select-option-image/rich-select-option-image.vue'
export { default as RichSelectOptionIndicator, default as VanillaRichSelectOptionIndicator } from './components/rich-select-option-indicator/rich-select-option-indicator.vue'
export { default as RichSelectTagImage, default as VanillaRichSelectTagImage } from './components/rich-select-tag-image/rich-select-tag-image.vue'

export { default as Select, default as VanillaSelect } from './components/select/select.vue'
export { default as SelectOption, default as VanillaSelectOption } from './components/select/option.vue'

export { default as Skeleton, default as VanillaSkeleton } from './components/skeleton/skeleton.vue'

export { default as Slideover, default as VanillaSlideover } from './components/slideover/slideover.vue'

export { default as StatusIndicator, default as VanillaStatusIndicator } from './components/status-indicator/status-indicator.vue'

export { default as TagsInput, default as VanillaTagsInput } from './components/tags-input/tags-input.vue'

export { default as Textarea, default as VanillaTextarea } from './components/textarea/textarea.vue'

export { default as Toggle, default as VanillaToggle } from './components/toggle/toggle.vue'
export { default as ToggleGroup, default as VanillaToggleGroup } from './components/toggle/toggle-group.vue'

// ----------------- //
// Types
// ----------------- //
export * from './types'

// ----------------- //
// Plugin to Install
// ----------------- //

export {
  default as VanillaComponents,
  default as Plugin,
} from './plugin'

// ----------------- //
// Other Utilities
// ----------------- //
export {
  useConfiguration,
  useVModel,
  useVariantProps,
  useMultipleVModel,
} from './core/use'

export {
  defaultConfiguration,
  mergeConfiguration,
  defineConfiguration,
  defineOptions,
} from './configuration'

