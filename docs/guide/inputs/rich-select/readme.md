# Rich Select

Native select component gives you the ability to select a list of options, how amazing isnt it?

## Properties

Inherits the default Layout Options and the following options:

| Prop       | Description               | Accepted Values                 | Default     |
| :--------- | :------------------------ | :------------------------------ | :---------- |
| `options`| Array/Object of options | Object|Arra y| `undefined` |
| `search`| Function to search threw objects| Boolean|Function | `false` |
| `searchPlaceholder` | A placeholder to show while searching | `String` | `Undefined`|
| `searchable`| If the select should be searchable | `Boolean` | `true`|
| `openOnClickLabel`| If the select should open on click the label | `Boolean` | `false`|
| `noResultsLabel`| When searching and no results | `String` | `false`|

## Events

| Event   | Description               | Parameters    |
| :------ | :------------------------ | :------------ |
| `modelValue` | Value emmited | `$event` |
| `labelClick` | When user clicks the label | `$event` |

## Slots

| Event   | Description               | Parameters    |
| :------ | :------------------------ | :------------ |
| `label` | Slot to change the label | `none` |
| `query` | Slot to change the label | `query`, `searchable` |
| `option` | Slot the option template | `query`, `searchable` |

## Example

```vue
<template>
  <x-input-rich-select
      class="inline-flex"
      :options="options"
      layout="naked"
      v-model="value"
  />
  <pre>{{ JSON.stringify(value) }}</pre>
</template>
<script>
import {XInputRichSelect} from "@vanilla-components";
export default {
  components: {
    XInputRichSelect
  },
  data() {
    return {
      value: null,
    }
  },
  computed: {
    options() {
      return [
        {value: 'Option 1', label: 'One Option'},
        {value: 'Option 2', label: 'Two Options'},
        {
          value: 'Option 2', label: 'Two Options',
          description: 'This an additional text for your select',
          indicator: 'green',
          image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      ]
    }
  }
}
</script>
```

## Preview
<wrapper src="inputs/rich-select/demo" />
