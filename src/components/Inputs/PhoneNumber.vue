<template>
  <vanilla-input-layout :layout="layout">
    <template #label>
      <slot
        v-if="$slots.label || label"
        name="label"
      >
        <vanilla-form-label
          :label-for="name"
          :value="label"
        />
      </slot>
    </template>

    <div class="relative flex-1">
      <div class="mt-1 rounded-md -space-y-px">
        <!-- Actual Country Code-->
        <vanilla-input-rich-select
          v-model="internalCountryCode"
          :model-value="countryCode"
          :errors="internalErrors"
          :name="'phoneCountryCode'+name"
          :options="phoneCountriesOptions"
          :search="searchPhoneCountries"
          :show-errors="false"
          grouped="bellow"
          layout="naked"
        >
          <!-- Selected Option -->
          <template #selected="{ option }">
            <slot name="selected">
              <vanilla-flag-icon
                :country="option?.value.toLowerCase()"
                class="h-3"
              />
              <span
                class="block whitespace-nowrap truncate"
                v-html="option?.label"
              />
            </slot>
          </template>

          <!-- Option Template -->
          <template #option="{ anOption }">
            <slot name="option">
              <vanilla-flag-icon
                :country="anOption?.value.toLowerCase()"
                class="h-3"
              />
              <span
                class="block whitespace-nowrap truncate"
                v-html="anOption?.label"
              />
            </slot>
          </template>
        </vanilla-input-rich-select>
        <!-- National Phone Number-->
        <div class="relative group">
          <vanilla-input-text
            v-model="internalPhoneNumber"
            :model-value="phone"
            :errors="internalErrors"
            :name="'phoneNumber'+name"
            :placeholder="phonePlaceHolder"
            :show-errors="false"
            class="pl-14"
            grouped="above"
            layout="naked"
            type="tel"
            @update:model-value="$emit('update:phone',$event)"
          >
            <template #before>
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20">
                <slot
                  name="dialCode"
                  v-bind="{ selectedPhoneCountry }"
                >
                  <span
                    class="sm:text-sm"
                    :class="{
                      'text-red-300': hasErrors,
                      'text-gray-500': !hasErrors
                    }"
                  >+{{ selectedPhoneCountry?.dialCode }}</span>
                </slot>
              </div>
            </template>
          </vanilla-input-text>
        </div>
      </div>
    </div>
    <vanilla-form-errors
      v-if="hasErrors && showErrors"
      :error="internalErrors"
    />
    <vanilla-form-helper
      v-if="help"
      :text="help"
    />
  </vanilla-input-layout>
</template>
<script>
import SyncProps from "@/utils/SyncProps";
import UseFormInputs from "@/utils/UseFormInputs";
import VanillaInputLayout from "@/components/Inputs/Partials/Layout.vue";
import VanillaFormErrors from "@/components/Inputs/Partials/Errors.vue";
import VanillaFormHelper from "@/components/Inputs/Partials/Helper.vue";
import VanillaFormLabel from "@/components/Inputs/Partials/Label.vue";
import VanillaInputRichSelect from "@/components/Inputs/RichSelect.vue";
import VanillaInputText from "@/components/Inputs/Text.vue";
import VanillaFlagIcon from "@/components/Icons/FlagIcon/Index.vue";
import {filterCountriesByName, phoneCountries} from "@/utils/CountryCodes";
import find from 'lodash/find';
import first from 'lodash/first';

export default {
    name: 'VanillaInputPhoneNumber',
    components: {
        VanillaFlagIcon,
        VanillaFormLabel,
        VanillaFormHelper,
        VanillaFormErrors,
        VanillaInputText,
        VanillaInputRichSelect,
        VanillaInputLayout,
    },
    mixins: [
        UseFormInputs,
        SyncProps
    ],
    props: {
        phone: {
            type: [String, Number],
            required: false,
            default: null,
            sync: 'internalPhoneNumber',
        },
        countryCode: {
            type: [String, Number],
            required: false,
            default: null,
            sync: 'internalCountryCode'
        },
        fullPhone: {
            type: [String, Number],
            required: false,
            default: null,
            sync: 'internalFullPhone'
        },
        phonePlaceHolder: {
            type: [String, Number],
            required: false,
            default: (props) => {
                return '4844578762';
            },
        }
    },
    emits: [
        'update:phone',
        'update:countryCode',
        'update:countryDialCode',
        'update:fullPhone',
    ],
    data() {
        return {
            internalPhoneNumber: null,
            internalCountryCode: null,
            internalCountryDialCode: null,
            internalFullPhone: null,
        }
    },
    computed: {
        selectedPhoneCountry() {
            return find(
                phoneCountries,
                country => country.value === this.internalCountryCode
            ) || first(this.phoneCountriesOptions)
        },
        countryDialCode() {
            return this.selectedPhoneCountry?.dialCode;
        },
        phoneCountriesOptions() {
            return filterCountriesByName('', this.internalCountryCode, phoneCountries);
        },
    },
    watch: {
        internalPhoneNumber: {
            handler: function (value, oldValue) {
                // This ensures the state is cleared when the user changes the input
                if (value !== '') {
                    this.internalFullPhone = '+' + this.countryDialCode + value;
                    this.$emit('update:fullPhone', this.internalFullPhone)
                    this.$emit('update:phone', value)
                    this.internalValue = this.internalFullPhone;
                }
            }
        },
        internalCountryCode: {
            handler: function (value, oldValue) {
                // This ensures the state is cleared when the user changes the input
                if (value !== '') {
                    this.internalCountryDialCode = this.countryDialCode;
                    this.internalFullPhone = '+' + this.internalCountryDialCode + this.internalPhoneNumber;
                    this.$emit('update:fullPhone', this.internalFullPhone);
                    this.$emit('update:countryDialCode', this.internalCountryDialCode);
                    this.$emit('update:countryCode', value);
                    this.internalValue = this.internalFullPhone;
                }
            }
        },
    },
    beforeMount() {
        this.internalPhoneNumber = this.phone;
    },
    methods: {
        searchPhoneCountries(options, query) {
            return filterCountriesByName(query, this.internalCountryCode, phoneCountries)
        },
    },
}
</script>

