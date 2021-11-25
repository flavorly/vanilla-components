# Phone Number

Phone number input with Country code and Phone Number, supports country code and full number out of the box

## Properties

Inherits the default Layout Options and the following options:

| Prop       | Description               | Accepted Values                 | Default     |
| :--------- | :------------------------ | :------------------------------ | :---------- |
| `phone`    | The Phone number in national format | `Number`,`String` | `undefined` |
| `countryCode` | Standard Country Code Ex: US, PT etc | `String` | `undefined` |
| `fullPhone` | The full phone number with country indicative | `String` | `undefined` |
| `phonePlaceHolder` | Placeholder for the phone number | `String` | `undefined` |

## Events

| Event   | Description               | Parameters    |
| :------ | :------------------------ | :------------ |
| `phone` | Phone number in national format | `$event` |
| `countryCode` | Country code in ISO format | `$event` |
| `countryDialCode` | The dial code for the phone number | `$event` |
| `fullPhone` | The full phone number | `$event` |

## Slots

Todo

## Example
```vue
<template>
    <vanilla-input-phone-number
      v-model:countryCode="countryCode"
      v-model:countryDialCode="countryDialCode"
      v-model:phone="phoneNumber"
      v-model:fullPhone="fullPhoneNumber"
      class="inline-flex"
      layout="naked"
    />
    <pre>{{ JSON.stringify(value) }}</pre>
</template>
<script>
import {VanillaInputPhoneNumber} from "@vanilla-components";
export default {
  components: {
    XInputPhoneNumber,
  },
  data(){
    return {
      countryCode: 'US',
      phoneNumber: '4844578762',
      fullPhoneNumber: null,
      countryDialCode: null,
    }
  },
}
</script>
```

## Preview
<wrapper src="inputs/phone-number/demo" />
