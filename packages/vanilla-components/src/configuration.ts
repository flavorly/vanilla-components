import type { ComponentsConfiguration } from './core/types'
import * as Components from '@/components'

const mergeConfiguration = (userConfiguration: ComponentsConfiguration = {}) => {
    // Merge Vanilla Components Configuration with the user configuration
    // Return Both Merged Configuration
    return Object.assign(
      {
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
        SkeletonBar: Components.skeletonBarConfig,
        Slideover: Components.slideoverConfig,
        StatusIndicator: Components.statusIndicatorConfig,
        Textarea: Components.textareaConfig,
        Toggle: Components.toggleConfig,
      },
      userConfiguration,
    )
}

export default mergeConfiguration
