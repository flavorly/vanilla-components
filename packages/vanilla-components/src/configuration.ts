import merge from 'lodash/merge'
import {
  VanillaAvatarConfig,
  VanillaButtonConfig,
  VanillaCardConfig,
  VanillaCheckboxConfig,
  VanillaDatatableConfig,
  VanillaDatetimePickerConfig,
  VanillaDialogConfig,
  VanillaDropdownConfig,
  VanillaFormErrorsConfig,
  VanillaFormFeedbackConfig,
  VanillaFormLabelConfig,
  VanillaFormSectionConfig,
  VanillaInputConfig,
  VanillaInputGroupConfig,
  VanillaPhoneNumberConfig,
  VanillaRichRadioConfig,
  VanillaRichRadioOptionConfig,
  VanillaRichSelectConfig,
  VanillaRichSelectOptionWithImageConfig,
  VanillaRichSelectOptionWithIndicatorsConfig,
  VanillaRichSelectStateConfig,
  VanillaRichSelectTagWithImageConfig,
  VanillaSelectConfig,
  VanillaSelectCountryConfig,
  VanillaSelectCountryOptionConfig,
  VanillaSkeletonBarConfig,
  VanillaSlideoverConfig,
  VanillaStatusIndicatorConfig,
  VanillaTextareaConfig,
  VanillaToggleConfig,
} from './configs'
import type { VanillaComponentConfiguration } from './core/types'

const mergeConfiguration = (userConfiguration: VanillaComponentConfiguration = {}) => {
    // Merge Vanilla Components Configuration with the user configuration
  // Return Both Merged Configuration
    return merge(
      {
        Avatar: VanillaAvatarConfig,
        Button: VanillaButtonConfig,
        Card: VanillaCardConfig,
        VanillaCheckbox: VanillaCheckboxConfig,
        VanillaDatatable: VanillaDatatableConfig,
        VanillaDatetimePicker: VanillaDatetimePickerConfig,
        VanillaDialog: VanillaDialogConfig,
        VanillaDropdown: VanillaDropdownConfig,

        VanillaFormErrors: VanillaFormErrorsConfig,
        VanillaFormFeedback: VanillaFormFeedbackConfig,
        VanillaFormLabel: VanillaFormLabelConfig,
        VanillaFormSection: VanillaFormSectionConfig,

        VanillaInput: VanillaInputConfig,
        VanillaInputGroup: VanillaInputGroupConfig,

        VanillaPhoneNumber: VanillaPhoneNumberConfig,

        VanillaRichRadio: VanillaRichRadioConfig,
        VanillaRichRadioOption: VanillaRichRadioOptionConfig,

        VanillaRichSelect: VanillaRichSelectConfig,
        VanillaRichSelectOptionWithImage: VanillaRichSelectOptionWithImageConfig,
        VanillaRichSelectOptionWithIndicators: VanillaRichSelectOptionWithIndicatorsConfig,
        VanillaRichSelectState: VanillaRichSelectStateConfig,
        VanillaRichSelectTagWithImage: VanillaRichSelectTagWithImageConfig,

        VanillaSelect: VanillaSelectConfig,
        VanillaSelectCountry: VanillaSelectCountryConfig,
        VanillaSelectCountryOption: VanillaSelectCountryOptionConfig,

        VanillaSkeletonBar: VanillaSkeletonBarConfig,
        VanillaSlideover: VanillaSlideoverConfig,
        VanillaStatusIndicator: VanillaStatusIndicatorConfig,
        VanillaTextarea: VanillaTextareaConfig,
        VanillaToggle: VanillaToggleConfig,
      },
      userConfiguration,
    )
}

export default mergeConfiguration
