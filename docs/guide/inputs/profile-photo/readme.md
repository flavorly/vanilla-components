# Profile Photo Input

A usefull field to upload profile photos

!!!include(./docs/guide/includes/shared-props.md)!!!

## Specific Properties

Properties available for this component that extending the default properties.

| Prop                 | Description                                                              | Accepted Values | Default |
|:---------------------|:-------------------------------------------------------------------------|:----------------|:--------|
| `photo`              | Absoluate path to the image already uploaded or placeholder/base64encode | String          | `''`    |
| `photoAlt`           | Alternative Text for the photo                                           | String          | `''`    |
| `placeholderLetters` | When no photo is present, letters to show as placerholder                | String          | `''`    |
| `buttonLabel`        | Label for the button to upload profile picture                           | String          | `''`    |

## Events

Events Emmit for this Component

| Event        | Description                   | Parameters |
|:-------------|:------------------------------|:-----------|
| `modelValue` | Value emitted / File / Object | `$event`   |

## Slots

Slots Available for this Component

| Name | Description | Parameters |
|:-----|:------------|:-----------|
!!!include(./docs/guide/includes/slots-default.md)!!!
| `button` | Button to click to upload photo | `selectNewPhoto`, `hasErrors` |
| `preview` | The Preview once a photo is uploaded | `photoPreview` |
| `photo` | Placeholder for the current photo | `photo`,`photoAlt`,`hasErrors`,`placeholderLetters` |

## Example
```vue
<template>
    <vanilla-input-profile-photo
        v-model="path"
        :help="'Toggle me to see magic'"
        :photo="null"
        :placeholderLetters="'User'"
        layout="naked"
    />
</template>
<script>
import {VanillaInputProfilePhoto} from "@vanilla-components";
export default {
  components: {
    VanillaInputProfilePhoto
  },
  data(){
    return {
        path: null,
    }
  }
}
</script>
```

## Preview
<wrapper src="inputs/profile-photo/demo" />
