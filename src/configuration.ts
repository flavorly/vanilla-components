import merge from 'lodash/merge';
import { VanillaComponentConfiguration } from '@/core/types';

import {
  VanillaAvatarConfig,
  VanillaButtonConfig,
  VanillaCardConfig,
  VanillaCheckboxConfig,
  VanillaCheckboxConfigToVariantJs,
  VanillaDatatableConfig,
  VanillaDatetimePickerConfig,
  VanillaDialogConfig,
  VanillaDropdownConfig,

  VanillaFormErrorsConfig,
  VanillaFormFeedbackConfig,
  VanillaFormLabelConfig,
  VanillaFormSectionConfig,

  VanillaInputConfig,
  VanillaInputConfigToVariantJs,
  VanillaInputGroupConfig,

  VanillaPhoneNumberConfig,
  VanillaRichRadioConfig,
  VanillaRichRadioOptionConfig,

  VanillaRichSelectConfig,
  VanillaRichSelectConfigToVariantJs,
  VanillaRichSelectOptionWithImageConfig,
  VanillaRichSelectOptionWithIndicatorsConfig,
  VanillaRichSelectStateConfig,
  VanillaRichSelectTagWithImageConfig,

  VanillaSelectConfig,
  VanillaSelectConfigToVariantJs,
  VanillaSelectCountryConfig,
  VanillaSelectCountryOptionConfig,

  VanillaSkeletonBarConfig,

  VanillaTextareaConfig,
  VanillaToggleConfig,

} from './configs';

const mergeConfiguration = (userConfiguration: VanillaComponentConfiguration = {}) => {

    // Merge Vanilla Components Configuration with the user configuration
    const VanillaComponentsDefaults = merge(
      {
        VanillaAvatar: VanillaAvatarConfig,
        VanillaButton: VanillaButtonConfig,
        VanillaCard: VanillaCardConfig,
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
        VanillaTextarea: VanillaTextareaConfig,
        VanillaToggle: VanillaToggleConfig,
      },
      userConfiguration,
    );

    // Mapping the Variant JS Configuration with the Vanilla Components Configuration & User Provider Configuration
    const VariantJSMapping = {
        TInput: VanillaInputConfigToVariantJs(VanillaComponentsDefaults?.VanillaInput ?? {}),
        TRichSelect: VanillaRichSelectConfigToVariantJs(VanillaComponentsDefaults?.VanillaRichSelect ?? {}),
        TCheckbox: VanillaCheckboxConfigToVariantJs(VanillaComponentsDefaults?.VanillaCheckbox ?? {}),
        TSelect: VanillaSelectConfigToVariantJs(VanillaComponentsDefaults?.VanillaSelect ?? {}),
    };

    // Return Both Merged Configuration
    return merge(
      VanillaComponentsDefaults,
      VariantJSMapping,
  );
};

export default mergeConfiguration;
