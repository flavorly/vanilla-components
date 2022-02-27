import { merge } from 'lodash';
import { VanillaComponentConfiguration } from '@/core/types';

import { VanillaInputConfig, VanillaInputConfigToVariantJs } from '@/components/Input';
import { VanillaDatetimePickerConfig } from '@/components/DatetimePicker';
import { VanillaTextareaConfig } from '@/components/Textarea';
import { VanillaFormErrorsConfig } from '@/components/FormErrors';
import { VanillaFormFeedbackConfig } from '@/components/FormFeedback';
import { VanillaRichSelectConfig, VanillaRichSelectConfigToVariantJs } from '@/components/RichSelect';
import { VanillaRichSelectOptionWithImageConfig } from '@/components/RichSelect/RichSelectOptionWithImage';
import { VanillaPhoneNumberConfig } from '@/components/PhoneNumber';
import { VanillaCheckboxConfig, VanillaCheckboxConfigToVariantJs } from '@/components/Checkbox';
import { VanillaAvatarConfig } from '@/components/Avatar';
import { VanillaRichRadioConfig } from '@/components/RichRadio';
import { VanillaToggleConfig } from '@/components/Toggle';

const mergeConfiguration = (userConfiguration: VanillaComponentConfiguration = {}) => {

    // Merge Vanilla Components Configuration with the user configuration
    const VanillaComponentsDefaults = merge(
      {
        VanillaInput: VanillaInputConfig,
        VanillaTextarea: VanillaTextareaConfig,
        VanillaDatetimePicker: VanillaDatetimePickerConfig,
        VanillaRichSelect: VanillaRichSelectConfig,
        VanillaRichSelectOptionWithImage: VanillaRichSelectOptionWithImageConfig,
        VanillaPhoneNumber: VanillaPhoneNumberConfig,
        VanillaCheckbox: VanillaCheckboxConfig,
        VanillaAvatar: VanillaAvatarConfig,
        VanillaRichRadio: VanillaRichRadioConfig,
        VanillaToggle: VanillaToggleConfig,

        VanillaFormErrors: VanillaFormErrorsConfig,
        VanillaFormFeedback: VanillaFormFeedbackConfig,
      },
      userConfiguration,
    );

    // Mapping the Variant JS Configuration with the Vanilla Components Configuration & User Provider Configuration
    const VariantJSMapping = {
        TInput: VanillaInputConfigToVariantJs(VanillaComponentsDefaults?.VanillaInput ?? {}),
        TRichSelect: VanillaRichSelectConfigToVariantJs(VanillaComponentsDefaults?.VanillaRichSelect ?? {}),
        TCheckbox: VanillaCheckboxConfigToVariantJs(VanillaComponentsDefaults?.VanillaCheckbox ?? {}),
    };

    // Return Both Merged Configuration
    return merge(
      VanillaComponentsDefaults,
      VariantJSMapping,
  );
};

export default mergeConfiguration;
