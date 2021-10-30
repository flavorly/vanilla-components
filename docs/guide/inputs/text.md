# Text Input

Native text component gives you the ability to write text and number hein, how amazing isnt it?

## Properties

Inherits the default Layout Options.

| Prop       | Description               | Accepted Values                 | Default     |
| :--------- | :------------------------ | :------------------------------ | :---------- |
| `placeholder`    | Array/Object of options        | Object|Array | `undefined` |

## Events

| Event   | Description               | Parameters    |
| :------ | :------------------------ | :------------ |
| `modelValue` | Value emmited | `$event` |

## Example
```vue
<template>
    <x-input-text
        class="inline-flex"
        layout="naked"
        placeholder="Your name"
        v-model="value"
    />
</template>
<script>
import XInputText from "Text";
export default {
  name: "ExampleInput",
  components: {
    XInputText
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
<x-wrapper src="input-text" />
