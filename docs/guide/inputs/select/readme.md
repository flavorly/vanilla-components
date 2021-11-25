# Select

Native select component gives you the ability to select a list of options, how amazing isnt it?

## Properties

Inherits the default Layout Options and the following options:

| Prop       | Description               | Accepted Values                 | Default     |
| :--------- | :------------------------ | :------------------------------ | :---------- |
| `options`    | Array/Object of options        | Object|Array                               | `undefined` |
| `title`    | HTML title attribute      | -                               | `undefined` |
| `type`     | Visual type of button     | `default`, `outlined` or `text` | `default`   |
| `disabled` | HTML's disabled attribute | `true` or `false`               | `false`     |

## Events

| Event   | Description               | Parameters    |
| :------ | :------------------------ | :------------ |
| `modelValue` | Value emmited | `$event` |

## Slots

| Event   | Description               | Parameters    |
| :------ | :------------------------ | :------------ |
| `option` | Slot to change the option | `item, index` |

## Example
```vue
<template>
    <x-select
        class="inline-flex"
        :options="options"
        layout="naked"
        v-model="value"
    />
    <pre>{{ JSON.stringify(value) }}</pre>
</template>
<script>
import {XInputSelect} from "@vanilla-components";
export default {
  components: {
    XInputSelect
  },
  data(){
    return {
      value: null,
    }
  },
  computed: {
    options(){
      return [
        {value: 'Option 1', label: 'One Option'},
        {value: 'Option 2', label: 'Two Options'},
        {value: [ { anotherObject: true, nested: 'deep'}], label: 'Complex Object'}
      ]
    }
  }
}
</script>
```

## Preview
<wrapper src="inputs/select/demo" />
