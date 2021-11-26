# Text Input

Native text component gives you the ability to write text and number hein, how amazing isnt it?

## Properties

Inherits the default Layout Options.

| Prop       | Description               | Accepted Values                 | Default     |
| :--------- | :------------------------ | :------------------------------ | :---------- |
| `placeholder`| Array/Object of options| Object|Array | `undefined` |

## Events

| Event   | Description               | Parameters    |
| :------ | :------------------------ | :------------ |
| `modelValue` | Value emmited | `$event` |

## Example
```vue
<template>
    <vanilla-input-text
        class="inline-flex"
        layout="naked"
        placeholder="Elon Musk"
        v-model="value"
        helper="Write your first and last name"
    />
</template>
<script>
import {VanillaInputText} from "@vanilla-components";
export default {
  components: {
    VanillaInputText
  },
  data(){
    return {
      value: null,
    }
  }
}
</script>
```

## Preview
<wrapper src="inputs/text/demo" />
