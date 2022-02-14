import { VanillaComponentConfiguration } from '@/core/types';
import { merge } from 'lodash';

import { VanillaInputConfig, VanillaInputConfigToVariantJs } from '@/components/Input/Config';
import { VanillaDatetimePickerConfig } from '@/components/DatetimePicker/Config';
import { VanillaFormErrorsConfig } from '@/components/FormErrors/Config';
import { VanillaFormFeedbackConfig } from '@/components/FormFeedback/Config';

const MergeWithVariantJsAndUserConfiguration = (userConfiguration: VanillaComponentConfiguration = {}) => {

    // Merge Vanilla Components Configuration with the user configuration
    const VanillaComponentsDefaults = merge(
      {
        VanillaInput: VanillaInputConfig,
        VanillaDatetimePicker: VanillaDatetimePickerConfig,
        VanillaFormErrors: VanillaFormErrorsConfig,
        VanillaFormFeedback: VanillaFormFeedbackConfig,
      },
      userConfiguration,
    );

    // Mapping the Variant JS Configuration with the Vanilla Components Configuration & User Provider Configuration
    const VariantJSMapping = {
        TInput: VanillaInputConfigToVariantJs(VanillaComponentsDefaults?.VanillaInput ?? {}),
    };

    // Return Both Merged Configuration
    return merge(
      VanillaComponentsDefaults,
      VariantJSMapping,
  );
};

export default MergeWithVariantJsAndUserConfiguration;
