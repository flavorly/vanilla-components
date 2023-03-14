<script setup lang="ts">
import type { PropType, Ref } from 'vue'
import type { CountryCallingCode, CountryCode, PhoneNumber } from 'libphonenumber-js/types'
import { onMounted, ref, watch } from 'vue'
import { getCountryCallingCode, getExampleNumber, parsePhoneNumber } from 'libphonenumber-js'
import examples from 'libphonenumber-js/mobile/examples'
import type { FavoriteCountriesValue, MinimumInputLengthTextProp } from '../../core/types'
import { useConfiguration, useVModel, useVariantProps } from '../../core/use'
import { countryCodes } from '../../core/utils'
import CountryInput from '../country-input/country-input.vue'
import FormErrors from '../forms/form-errors.vue'
import FormFeedback from '../forms/form-feedback.vue'
import Input from '../input/input.vue'
import type { PhoneInputClassesValidKeys, PhoneInputProps } from './config'
import { phoneInputConfig } from './config'

const props = defineProps({
  ...useVariantProps<PhoneInputProps, PhoneInputClassesValidKeys>(),
  modelValue: {
    type: [String, Number] as PropType<string>,
    default: undefined,
  },
  countryCode: {
    type: [String] as PropType<CountryCode>,
    default: '',
  },
  phonePlaceholder: {
    type: [String, Number] as PropType<string | number>,
    default: 'Your national number',
  },
  countryPlaceholder: {
    type: [String, Number] as PropType<string | number>,
    default: 'Select your phone indicative',
  },
  favoriteCountries: {
    type: [Array, Object, undefined] as PropType<FavoriteCountriesValue>,
    required: false,
    default: () => ['US', 'GB', 'PT', 'FR', 'DE'],
  },
  searchBoxPlaceholder: {
    type: String,
    default: 'Your Phone Number country',
  },
  noResultsText: {
    type: String,
    default: '😟 Sorry but we did not find any countries to your query. Try another one query?',
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
  minimumInputLengthText: {
    type: [Function, String] as PropType<MinimumInputLengthTextProp>,
    default: () => (minimumInputLength: number): string => `Search more countries by entering ${minimumInputLength} or more characters`,
  },
})

const emit = defineEmits([
  'update:countryDialCode',
  'update:countryCode',
  'update:countryName',
  'update:modelValue',
  'update:phoneNumberNational',
  'update:phoneNumberInternational',
])

const rootPhone = ref(null)
const rootCountry = ref(null)
const localValue = useVModel(props, 'modelValue')
const phoneCountryCode = ref<CountryCode>(props.countryCode)
const phoneDialCode = ref<CountryCallingCode | string[] | number | null>(null)
const phoneNumber: Ref<string | undefined> = ref(localValue.value)
const isValidPhoneNumber: Ref<boolean> = ref(false)
const placeholder = ref<string | number | undefined>(props.phonePlaceholder)
const parsedPhoneNumber = ref<PhoneNumber | null>(null)

const attemptToParseNumber = (phoneNumberValue: string | undefined, phoneCountryCodeValue: CountryCode) => {
  if (!phoneNumberValue || !phoneCountryCodeValue) {
    return
  }

  try {
    // Always resolve the country code to dial code
    phoneDialCode.value = getCountryCallingCode(phoneCountryCodeValue)

    // Attempt to parse the number and country code
    parsedPhoneNumber.value = parsePhoneNumber(phoneNumberValue || '', phoneCountryCodeValue)

    // If we are able to parse, then we will assign the new values
    if (parsedPhoneNumber.value) {
      isValidPhoneNumber.value = parsedPhoneNumber.value?.isValid()
      phoneCountryCode.value = parsedPhoneNumber.value.country
      phoneDialCode.value = parsedPhoneNumber.value?.countryCallingCode
      phoneNumber.value = parsedPhoneNumber.value?.nationalNumber
      localValue.value = `+${phoneDialCode.value}${phoneNumber.value}`
    }
  }
  catch (e) {
    const countryCallingCode = countryCodes.find(country => country.iso2 === phoneCountryCodeValue?.toLowerCase())?.dialCode
    if (countryCallingCode) {
      phoneDialCode.value = countryCallingCode
    }
    localValue.value = `+${phoneDialCode.value}${phoneNumber.value}`
  }
}

onMounted(() => {
  attemptToParseNumber(phoneNumber.value, phoneCountryCode.value)
  if (phoneDialCode.value === null) {
    phoneDialCode.value = getCountryCallingCode(phoneCountryCode.value)
  }
})

const { configuration, errors, hasErrors, variant } = useConfiguration<PhoneInputProps>(phoneInputConfig, 'PhoneInput', localValue)

// Watch Country Code and Phone number together
// When one changes we will trigger the model value & emit back
watch([phoneCountryCode, phoneNumber, localValue], ([newPhoneCountryCode, newPhoneNumber]) => {
  attemptToParseNumber(newPhoneNumber, newPhoneCountryCode)

  const examplePlaceHolder = getExampleNumber(newPhoneCountryCode, examples)?.nationalNumber as string | undefined
  if (examplePlaceHolder && (props.phonePlaceholder === '' || props.phonePlaceholder === undefined)) {
    placeholder.value = examplePlaceHolder
  }

  if (phoneCountryCode.value) {
    phoneDialCode.value = getCountryCallingCode(phoneCountryCode.value)
  }

  // Watch & Emit additional data
  emit('update:countryDialCode', phoneDialCode.value)
  emit('update:countryCode', phoneCountryCode.value)
  emit('update:phoneNumberNational', phoneNumber.value)
  emit('update:phoneNumberInternational', localValue.value)
}, { immediate: true })

defineOptions({
  name: 'VanillaPhoneInput',
  inheritAttrs: false,
})

/**
 * @docs
 * @displayName VanillaPhoneInput
 * @description An input component that allows you to enter a phone number & country
 **/
</script>

<template>
  <div
    class="vanilla-input-phone-number"
    :class="configuration.classesList.wrapper"
  >
    <div :class="[configuration.classesList.inputsContainer]">
      <CountryInput
        ref="rootCountry"
        v-model.lazy="phoneCountryCode"
        :favorite-countries="favoriteCountries"
        :variant="variant"
        :show-errors="false"
        :label-with-dial-code="true"
        :placeholder="countryPlaceholder"
        :clearable="false"
        :search-box-placeholder="searchBoxPlaceholder"
        :no-results-text="noResultsText"
        :searching-text="searchingText"
        :loading-closed-placeholder="loadingClosedPlaceholder"
        :loading-more-results-text="loadingMoreResultsText"
        rounded="top"
      />
      <Input
        ref="rootPhone"
        v-model.lazy="phoneNumber"
        :variant="variant"
        :show-errors="false"
        :placeholder="placeholder"
        :autocomplete="props.autocomplete"
        :fixed-classes="configuration.classesList.input.fixedClasses"
        rounded="bottom"
      >
        <template #before="{ className }">
          <slot
            name="dialCode"
            v-bind="{ phoneDialCode }"
          >
            <span
              class="sm:text-sm"
              :class="className"
            >+{{ phoneDialCode }}</span>
          </slot>
        </template>
      </Input>
    </div>
    <slot
      name="errors"
      v-bind="{ hasErrors, errors }"
    >
      <FormErrors
        v-if="hasErrors && props.showErrors"
        :errors="errors"
      />
    </slot>
    <slot
      name="feedback"
      v-bind="{ hasErrors, feedback: props.feedback }"
    >
      <FormFeedback
        v-if="!hasErrors && props.feedback && props.showFeedback"
        :text="props.feedback"
      />
    </slot>
  </div>
</template>

