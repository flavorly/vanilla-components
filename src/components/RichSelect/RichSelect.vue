<template>
  <div
    class="vanilla-rich-select"
    :class="configuration.classesList.wrapper"
  >
    <t-rich-select
      :id="name"
      v-model="localValue"
      :fixed-classes="fixedClassesOverrides"
      v-bind="$attrs"
      :variant="localVariant"
      :name="name"
      :options="options"
      :normalize-otions="normalizeOptions"
      :multiple="multiple"
      :disabled="disabled"
      :tags="tags"
      :placeholder="placeholder"
      :dropdown-placement="dropdownPlacement"
      :dropdown-popper-options="dropdownPopperOptions"
      :close-on-select="closeOnSelect"
      :select-on-close="selectOnClose"
      :clear-search-on-close="clearSearchOnClose"
      :toggle-on-focus="toggleOnFocus"
      :toggle-on-click="toggleOnClick"
      :value-attribute="valueAttribute"
      :text-attribute="textAttribute"
      :hide-search-box="hideSearchBox"
      :search-box-placeholder="searchBoxPlaceholder"
      :no-results-text="noResultsText"
      :searching-text="searchingText"
      :loading-closed-placeholder="loadingClosedPlaceholder"
      :loading-more-results-text="loadingMoreResultsText"
      :clearable="clearable"
      :max-height="maxHeight"
      :fetch-options="fetchOptions"
      :pre-fetch-options="prefetchOptions"
      :delay="delay"
      :minimum-input-length="minimumInputLength"
      :minimum-input-length-text="minimumInputLengthText"
      :minimum-results-for-search="minimumResultsForSearch"
      :teleport="teleport"
      :teleport-to="teleportTo"
    >
      <!-- Label -->
      <template #label="{selectedOption: option, className, label}">
        <slot
          name="label"
          v-bind="{ option, className,label, hasErrors}"
        />
      </template>

      <!-- Option -->
      <template #tagLabel="{ option, className, isSelected }">
        <slot
          name="tagLabel"
          v-bind="{option, className, isSelected, hasErrors}"
        />
      </template>

      <!-- Option -->
      <template #option="{ option, className, isSelected }">
        <slot
          name="option"
          v-bind="{option, className, isSelected, hasErrors}"
        />
      </template>

      <!-- Feedback for Loading, etc -->
      <template #stateFeedback="{fetchingOptions,needsMoreCharsToFetch,noResults}">
        <slot
          name="stateFeedback"
          v-bind="{fetchingOptions,needsMoreCharsToFetch,noResults}"
        >
          <vanilla-rich-select-state />
        </slot>
      </template>
    </t-rich-select>
    <!-- Erors -->
    <slot
      name="errors"
      v-bind="{hasErrors, localErrors}"
    >
      <VanillaFormErrors
        v-if="hasErrors && showErrors"
        :errors="localErrors"
      />
    </slot>
    <!-- Feedback -->
    <slot
      name="feedback"
      v-bind="{hasErrors, feedback}"
    >
      <VanillaFormFeedback
        v-if="!hasErrors && feedback !== undefined && showFeedback"
        :text="feedback"
      />
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, provide } from 'vue';
import {
    useBootVariant,
    useVModel,
    useVariantProps,
    useConfigurationWithClassesList,
    hasSlot,
} from '@/core';

import {
    VanillaRichSelectValue,
    VanillaRichSelectProps,
    MinimumInputLengthTextProp,
    VanillaRichSelectClassesKeys,
    VanillaRichSelectConfig,
} from '@/components/RichSelect/index';

import { popperOptions, validPlacements, sameWidthModifier } from '@/core/config/popperOptions';
import { Options, Placement } from '@popperjs/core';
import { FetchOptionsFn, PreFetchOptionsFn, InputOptions, Measure } from '@/core/types';
import VanillaFormErrors from '@/components/FormErrors/FormErrors.vue';
import VanillaFormFeedback from '@/components/FormFeedback/FormFeedback.vue';
import VanillaRichSelectState from '@/components/RichSelect/RichSelectState/RichSelectState.vue';
import { TRichSelect } from '@variantjs/vue';

export default defineComponent({
    name: 'VanillaRichSelect',
    components: {
        VanillaRichSelectState,
        TRichSelect,
        VanillaFormErrors,
        VanillaFormFeedback,
    },
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VanillaRichSelectProps>(),
        modelValue: {
            type: [
                String,
                Number,
                Boolean,
                Array,
                Object,
                Date,
                Function,
                Symbol,
            ] as PropType<VanillaRichSelectValue>,
            default: undefined,
        },
        options: {
            type: [Array, Object] as PropType<InputOptions>,
            default: undefined,
        },
        normalizeOptions: {
            type: Boolean,
            default: true,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        tags: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: undefined,
        },
        dropdownPlacement: {
            type: String as PropType<Placement>,
            default: undefined,
            validator: (value: string): boolean => validPlacements.includes(value),
        },
        dropdownPopperOptions: {
            type: Object as PropType<Options>,
            default: (): Options => ({
                ...popperOptions,
                placement: 'bottom',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 8],
                        },
                    },
                    sameWidthModifier,
                ],
            } as Options),
        },
        closeOnSelect: {
            type: Boolean,
            default: undefined,
        },
        selectOnClose: {
            type: Boolean,
            default: true,
        },
        clearSearchOnClose: {
            type: Boolean,
            default: true,
        },
        toggleOnFocus: {
            type: Boolean,
            default: false,
        },
        toggleOnClick: {
            type: Boolean,
            default: true,
        },
        valueAttribute: {
            type: String,
            default: undefined,
        },
        textAttribute: {
            type: String,
            default: undefined,
        },
        hideSearchBox: {
            type: Boolean,
            default: false,
        },
        searchBoxPlaceholder: {
            type: String,
            default: 'Search for your items here...',
        },
        noResultsText: {
            type: String,
            default: '😟 Sorry but we did not find any results to your query. Try another one query?',
        },
        searchingText: {
            type: String,
            default: 'Please wait, searching for results...',
        },
        loadingClosedPlaceholder: {
            type: String,
            default: 'Loading, please wait ...',
        },
        loadingMoreResultsText: {
            type: String,
            default: 'Loading more options...',
        },
        clearable: {
            type: Boolean,
            default: true,
        },
        maxHeight: {
            type: [Number, String] as PropType<Measure | null>,
            default: 250,
        },
        fetchOptions: {
            type: Function as PropType<FetchOptionsFn>,
            default: undefined,
        },
        prefetchOptions: {
            type: [Function, Boolean] as PropType<PreFetchOptionsFn | boolean>,
            default: false,
        },
        delay: {
            type: Number,
            default: 250,
        },
        minimumInputLength: {
            type: Number,
            default: undefined,
        },
        minimumInputLengthText: {
            type: [Function, String] as PropType<MinimumInputLengthTextProp>,
            default: () => (minimumInputLength: number): string => `Search more results by entering ${minimumInputLength} or more characters`,
        },
        minimumResultsForSearch: {
            type: Number,
            default: undefined,
        },
        teleport: {
            type: Boolean,
            default: true,
        },
        teleportTo: {
            type: [String, Object] as PropType<string | HTMLElement>,
            default: 'body',
        },
    },
    setup(props) {
        const localValue = useVModel(props, 'modelValue');
        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', localValue);

        const { configuration } = useConfigurationWithClassesList<VanillaRichSelectProps>(
            VanillaRichSelectConfig,
            VanillaRichSelectClassesKeys,
            localVariant,
        );

        /**
         * Provided data
         */
        provide('configuration_vanilla', configuration);

        let triggerClasses = '';

        if (props.hasItemBellow){
            triggerClasses += configuration.classesList?.groupedBellow;
        }

        if (props.hasItemAbove){
            triggerClasses += configuration.classesList?.groupedAbove;
        }

        const fixedClassesOverrides = {
            trigger: triggerClasses,
        };

        return {
            configuration,
            localValue,
            localVariant,
            localErrors,
            hasErrors,
            hasSlot,
            props,
            fixedClassesOverrides,
        };
    },
});
</script>

