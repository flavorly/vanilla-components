import merge from 'lodash/merge';
import { VanillaComponentConfiguration } from '@/core/types';

import { VanillaInputConfig, VanillaInputConfigToVariantJs } from '@/components/Input';
import { VanillaDatetimePickerConfig } from '@/components/DatetimePicker';
import { VanillaTextareaConfig } from '@/components/Textarea';

import { VanillaFormErrorsConfig } from '@/components/FormErrors';
import { VanillaFormFeedbackConfig } from '@/components/FormFeedback';

import { VanillaSelectConfig, VanillaSelectConfigToVariantJs } from '@/components/Select';
import { VanillaRichSelectConfig, VanillaRichSelectConfigToVariantJs } from '@/components/RichSelect';
import { VanillaRichSelectOptionWithImageConfig } from '@/components/RichSelect/RichSelectOptionWithImage';
import { VanillaRichSelectOptionWithIndicatorsConfig } from '@/components/RichSelect/RichSelectOptionWithIndicators';
import { VanillaRichSelectTagWithImageConfig } from '@/components/RichSelect/RichSelectTagWithImage';

import { VanillaSelectCountryConfig } from '@/components/SelectCountry';
import { VanillaPhoneNumberConfig } from '@/components/PhoneNumber';

import { VanillaCheckboxConfig, VanillaCheckboxConfigToVariantJs } from '@/components/Checkbox';
import { VanillaAvatarConfig } from '@/components/Avatar';
import { VanillaToggleConfig } from '@/components/Toggle';

import { VanillaRichRadioConfig } from '@/components/RichRadio';
import { VanillaRichRadioOptionConfig } from '@/components/RichRadio/RichRadioOption';

import { VanillaSkeletonBarConfig } from '@/components/Skeletons/SkeletonBar';

const mergeConfiguration = (userConfiguration: VanillaComponentConfiguration = {}) => {

    // Merge Vanilla Components Configuration with the user configuration
    const VanillaComponentsDefaults = merge(
      {
        VanillaInput: VanillaInputConfig,
        VanillaTextarea: VanillaTextareaConfig,
        VanillaDatetimePicker: VanillaDatetimePickerConfig,

        VanillaSelect: VanillaSelectConfig,
        VanillaRichSelect: VanillaRichSelectConfig,
        VanillaRichSelectOptionWithImage: VanillaRichSelectOptionWithImageConfig,
        VanillaRichSelectOptionWithIndicators: VanillaRichSelectOptionWithIndicatorsConfig,
        VanillaRichSelectTagWithImage: VanillaRichSelectTagWithImageConfig,

        VanillaPhoneNumber: VanillaPhoneNumberConfig,
        VanillaSelectCountry: VanillaSelectCountryConfig,

        VanillaCheckbox: VanillaCheckboxConfig,
        VanillaAvatar: VanillaAvatarConfig,
        VanillaToggle: VanillaToggleConfig,

        VanillaRichRadio: VanillaRichRadioConfig,
        VanillaRichRadioOption: VanillaRichRadioOptionConfig,

        VanillaFormErrors: VanillaFormErrorsConfig,
        VanillaFormFeedback: VanillaFormFeedbackConfig,

        VanillaSkeletonBar: VanillaSkeletonBarConfig,
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
