import merge from 'lodash/merge'
import type { ComponentsConfiguration } from './core/types'
import * as Components from './components'

export const defaultConfiguration = {
  Alert: Components.alertConfig,
  Avatar: Components.avatarConfig,
  Button: Components.buttonConfig,
  Card: Components.cardConfig,
  Checkbox: Components.checkboxConfig,
  CountryInput: Components.countryInputConfig,
  Datatable: Components.datatableConfig,
  DateTimeInput: Components.dateTimeInputConfig,
  Dialog: Components.dialogConfig,
  Dropdown: Components.dropdownConfig,
  FormErrors: Components.formsConfig,
  FormFeedback: Components.formsConfig,
  FormLabel: Components.formsConfig,
  FormSection: Components.formsConfig,
  Input: Components.inputConfig,
  InputGroup: Components.inputGroupConfig,
  PhoneInput: Components.phoneInputConfig,
  RichRadio: Components.richRadioConfig,
  RichRadioOption: Components.richRadioOptionConfig,
  RichSelect: Components.richSelectConfig,
  RichSelectOptionWithImage: Components.richSelectOptionWithImageConfig,
  RichSelectOptionWithIndicators: Components.richSelectOptionWithIndicatorsConfig,
  RichSelectTagWithImage: Components.richSelectTagWithImageConfig,
  Select: Components.selectConfig,
  SkeletonBar: Components.skeletonConfig,
  Slideover: Components.slideoverConfig,
  StatusIndicator: Components.statusIndicatorConfig,
  Textarea: Components.textareaConfig,
  Toggle: Components.toggleConfig,
}

export const mergeConfiguration = (userConfiguration: ComponentsConfiguration = {}) => {
    // Merge Vanilla Components Configuration with the user configuration
    // Return Both Merged Configuration
    return merge(defaultConfiguration, userConfiguration)
}

export const defineConfiguration = (userConfiguration: ComponentsConfiguration = {}, preset: ComponentsConfiguration | undefined = {}) => {
    // Merge Vanilla Components Configuration with the user configuration
    // Return Both Merged Configuration
    if (preset) {
      return merge(preset, userConfiguration)
    }
    return merge(defaultConfiguration, userConfiguration)
}
