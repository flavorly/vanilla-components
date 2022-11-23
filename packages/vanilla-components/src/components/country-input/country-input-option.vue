<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, onMounted } from 'vue'
import { countryInputOptionConfig } from './config'
import type { CountryInputOptionProps } from './config'
import Flag from '@/components/icons/flag.vue'
import CheckIcon from '@/components/icons/hero/solid/CheckIcon.vue'
import { useConfiguration } from '@/core/use'

const props = defineProps({
  country: {
    // TODO : move this to a exported type
    type: [Object, Array] as PropType<{
      value: string
      label: string
      name: string
      name_raw: string
      dialCode: string
      iso2: string
    }>,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  description: {
    type: [String] as PropType<string | undefined>,
    default: undefined,
  },
  hasErrors: {
    type: Boolean,
    default: false,
  },
  parentClasses: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  labelWithDialCode: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false,
  },
  labelWithCountryCode: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false,
  },
})

const { configuration } = useConfiguration<CountryInputOptionProps>(countryInputOptionConfig, 'CountryInputOption')

const nameLabel = computed(() => {
  if (props.labelWithDialCode) {
    return `${props.country.label} +${props.country.dialCode}`
  }

  if (props.labelWithCountryCode) {
    return `${props.country.label} (${props.country.dialCode})`
  }

  if (props.labelWithDialCode && props.labelWithCountryCode) {
    return `${props.country.label} +${props.country.dialCode} (${props.country.dialCode})`
  }

  return props.country.label
})

defineOptions({
  name: 'VanillaCountryInputOption',
  inheritAttrs: false,
})
</script>

<template>
  <div :class="[parentClasses, configuration.classesList.wrapper]">
    <div :class="[configuration.classesList.labelAndImageWrapper]">
      <div
        :class="[
          selected ? configuration.classesList.labelAndImageContainerSelected : '',
          !selected ? configuration.classesList.labelAndImageContainerRegular : '',
          configuration.classesList.labelAndImageContainer,
        ]"
      >
        <suspense>
          <Flag
            :class="[
              configuration.classesList.image,
            ]"
            :country="country?.iso2"
          />
          <template #fallback>
            <div :class="configuration.classesList.fallbackImage" />
          </template>
        </suspense>
        <span
          :class="[
            configuration.classesList.label,
          ]"
          v-html="nameLabel"
        />
      </div>
    </div>
    <div
      v-if="description"
      :class="[
        configuration.classesList.description,
        selected ? configuration.classesList.descriptionSelected : '',
        !selected ? configuration.classesList.descriptionRegular : '',
      ]"
      v-html="description"
    />
    <span
      v-if="selected"
      :class="[configuration.classesList.selectedIconContainer]"
    >
      <slot name="selectedIcon">
        <CheckIcon
          aria-hidden="true"
          :class="[configuration.classesList.icon]"
        />
      </slot>
    </span>
  </div>
</template>

