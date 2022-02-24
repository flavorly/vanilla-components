import { merge } from 'lodash';
import { VanillaComponentConfiguration } from '@/core/types';
import { VanillaInputConfig, VanillaInputConfigToVariantJs } from '@/components/Input/Config';
import { VanillaDatetimePickerConfig } from '@/components/DatetimePicker/Config';
import { VanillaTextareaConfig } from '@/components/Textarea/Config';
import { VanillaFormErrorsConfig } from '@/components/FormErrors/Config';
import { VanillaFormFeedbackConfig } from '@/components/FormFeedback/Config';
import { VanillaRichSelectConfig, VanillaRichSelectConfigToVariantJs } from '@/components/RichSelect/Config';
import { VanillaRichSelectOptionWithImageConfig } from '@/components/RichSelect/RichSelectOptionWithImage/Config';
import { VanillaPhoneNumberConfig } from '@/components/PhoneNumber/Config';
import { VanillaCheckboxConfig, VanillaCheckboxConfigToVariantJs } from '@/components/Checkbox/Config';

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
