# Country Picker

A useful Country Picker for your apps. Pre-loaded with the default countries & ISO-Codes

!!!include(./docs/guide/includes/shared-props.md)!!!

## Specific Properties

Properties available for this component that extending the default properties.

| Prop                | Description                           | Accepted Values | Default                          |
|:--------------------|:--------------------------------------|:----------------|:---------------------------------|
| `favoriteCountries` | Favorite countries to show as default | `Array`         | `['US', 'GB', 'PT', 'FR', 'DE']` |

## Events

Events Emmit for this Component

| Event             | Description                       | Parameters |
|:------------------|:----------------------------------|:-----------|
| `countryDialCode` | The dial code for this country    | `$event`   |
| `countryCode`     | Country code in ISO format        | `$event`   |
| `countryName`     | The Country name for this country | `$event`   |

## Slots

Slots Available for this Component

| Name | Description | Parameters |
|:-----|:------------|:-----------|
!!!include(./docs/guide/includes/slots-default.md)!!!
| `selected` | Slot for the selected Option | `option` |
| `option` | Slot for the Options item | `anOption` |

## Example
```vue
<template>
    <vanilla-input-country
            v-model="countryCode"
            v-model:countryCode="countryCode"
            v-model:countryDialCode="dialCode"
            v-model:countryName="name"
            class="inline-flex"
            layout="naked"
            :errors="'Change me to clear the error'"
    />
</template>
<script>
import {VanillaInputPhoneNumber} from "@vanilla-components";
export default {
  components: {
	VanillaInputPhoneNumber,
  },
  data(){
    return {
        countryCode: 'PT',
        dialCode: null,
        name: null,
    }
  },
}
</script>
```

## Preview
<wrapper src="inputs/country/demo" />
