# Rich Select

Rich Select that replaces the native select with batteries included, brings custom templating to options, indicators
images, searching & many more. Under the hood it uses HeadlessUI Listbox.

!!!include(./docs/guide/includes/shared-props.md)!!!

## Specific Properties

Properties available for this component that extending the default properties.

| Prop                | Description                                  | Accepted Values            | Default     |
|:--------------------|:---------------------------------------------|:---------------------------|:------------|
| `options`           | Array/Object of options                      | `Object`, `array`          | `undefined` |
| `search`            | Function to search threw objects             | `Boolean`, `Function`      | `false`     |
| `searchPlaceholder` | A placeholder to show while searching        | `String`                   | `undefined` |
| `searchable`        | If the select should be searchable           | `Boolean`                  | `true`      |
| `openOnClickLabel`  | If the select should open on click the label | `Boolean`                  | `false`     |
| `noResultsLabel`    | When searching and no results                | `String`                   | `false`     |

## Events
Events Emmit for this Component

| Event        | Description                | Parameters |
|:-------------|:---------------------------|:-----------|
| `modelValue` | Value emmited              | `$event`   |
| `labelClick` | When user clicks the label | `$event`   |

## Slots

Slots Available for this Component

| Name           | Description                                     | Parameters            |
|:---------------|:------------------------------------------------|:----------------------|
!!!include(./docs/guide/includes/slots-default.md)!!!
| `selected`     | Slot for the selected Option                     | `option`              |
| `option`       | Slot for the Options item                        | `anOption`            |
| `noResults`    | When no results are found slot to show the error | `query`, `searchable` |
| `selectedIcon` | Icon to show when the record/option is selected  | `none`                |
| `selectorIcon` | The icon to toggle the Select Box down           | `hasErrors`           |

## Options

Options should contain a specific structure, we could leave this to your own choice, but the whole point of this package
is to simplify your life, you are free tho, if you want to modify the default behaviour of this package and use your own structure, just 
make sure to also override the slots `option`and `selected` to align with your own logic.

The following key/values are available by default


| key           | value                                                               |
|:--------------|:--------------------------------------------------------------------|
| `value`       | The value for your v-model                                          |
| `label`       | Main Label for this this option                                     |
| `description` | Additional description to show bellow the option                    |
| `indicator`   | String of : green, yellow, red, blue, gray                          |
| `image`       | Image path, image will show rounded, similar to TailwindUI Exampels |

```js
const options = [
    { value: 'Option 1', label: 'One Option'},
    { value: 'Option 2', label: 'Two Options'},
    { value: {foo: 'bar'}, label: 'Complex Object'},
    { value: 'Option 2', label: 'Two Options', description: 'This is my option description'},
    { value: 'Option 2', label: 'Two Options', indicator: 'red'},
    { value: 'Option 2', label: 'Two Options', image: 'https://paypal.com/logo.png'},
]
```

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
