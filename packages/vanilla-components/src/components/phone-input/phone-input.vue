<script setup lang="ts">
import type { PropType, Ref } from 'vue'
import type { CountryCallingCode, CountryCode, PhoneNumber } from 'libphonenumber-js/types'
import { ref, watch } from 'vue'
import { getCountryCallingCode, getExampleNumber, parsePhoneNumber } from 'libphonenumber-js'
import examples from 'libphonenumber-js/mobile/examples'
import { phoneInputConfig } from './config'
import type { PhoneInputClassesValidKeys, PhoneInputProps } from './config'
import CountryInput from '@/components/country-input/country-input.vue'
import FormErrors from '@/components/forms/form-errors.vue'
import FormFeedback from '@/components/forms/form-feedback.vue'
import type { FavoriteCountriesValue, MinimumInputLengthTextProp } from '@/core/types'
import Input from '@/components/input/input.vue'
import { useConfiguration, useVModel, useVariantProps } from '@/core/use'
import { countryCodes } from '@/core/utils'

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

const localRefPhone = ref(null)
const localRefCountry = ref(null)
const localValue = useVModel(props, 'modelValue')
const phoneCountryCode: CountryCode | Ref = ref(props.countryCode)
const phoneDialCode: CountryCallingCode | Ref = ref(null)
const phoneNumber: Ref<string | undefined> = ref(localValue.value)
const isValidPhoneNumber: Ref<boolean> = ref(false)
const placeholder = ref<string | number | undefined>(props.phonePlaceholder)
const parsedPhoneNumber: Ref<PhoneNumber> | Ref = ref(null)

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

attemptToParseNumber(phoneNumber.value, phoneCountryCode.value)

const { configuration, errors, hasErrors, variant } = useConfiguration<PhoneInputProps>(phoneInputConfig, 'PhoneInput', localValue)

// Watch Country Code and Phone number together
// When one changes we will trigger the model value & emit back
watch([phoneCountryCode, phoneNumber], ([newPhoneCountryCode, newPhoneNumber]) => {
  attemptToParseNumber(newPhoneNumber, newPhoneCountryCode)

  const examplePlaceHolder = getExampleNumber(newPhoneCountryCode, examples)?.nationalNumber as string | undefined
  if (examplePlaceHolder) {
    placeholder.value = examplePlaceHolder
  }

  // Watch & Emit additional data
  emit('update:countryDialCode', phoneDialCode.value)
  emit('update:countryCode', phoneCountryCode.value)
  emit('update:phoneNumberNational', phoneNumber.value)
  emit('update:phoneNumberInternational', localValue.value)
}, { immediate: true })
</script>

<template>
  <div
    class="vanilla-input-phone-number"
    :class="configuration.classesList.wrapper"
  >
    <div :class="[configuration.classesList.inputsContainer]">
      <CountryInput
        ref="localRefCountry"
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
        ref="localRefPhone"
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
        v-if="!hasErrors && props.feedback !== undefined && props.showFeedback"
        :text="props.feedback"
      />
    </slot>
  </div>
</template>

