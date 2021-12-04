# Select

Native select input for Options & Options Picker.

!!!include(./docs/guide/includes/shared-props.md)!!!

## Specific Properties

Properties available for this component that extending the default properties.

| Prop        | Description                                           | Accepted Values | Default                           |
|:------------|:------------------------------------------------------|:----------------|:----------------------------------|
| `options`   | Array/Object of Options                               | Array, Object   | `[]`                              |
| `showEmpty` | If we should show the empty option                    | Boolean         | `true`                            |
| `empty`     | Default option to show when its empty or not selected | Object          | `{title: '&mdash;', value: null}` |

## Events

Events Emmit for this Component

| Event        | Description   | Parameters |
|:-------------|:--------------|:-----------|
| `modelValue` | Value emitted | `$event`   |

## Slots

Slots Available for this Component

| Name | Description | Scoped Variables |
|:-----|:------------|:-----------------|
!!!include(./docs/guide/includes/slots-default.md)!!!
| `option` | Slot to change the option | `item, index` |

## Options

Options should contain a specific structure, we could leave this to your own choice, but the whole point of this package
is to simplify your life, you are free tho, if you want to modify the default behaviour of this package and use your own structure, just
make sure to also override the slots `option`and `selected` to align with your own logic.

The following key/values are available by default

| key           | value                                                               |
|:--------------|:--------------------------------------------------------------------|
| `value`       | The value for your v-model                                          |
| `label`       | Main Label for this this option                                     |


## Example
```vue
<template>
    <vanilla-input-select
        class="inline-flex"
        :options="options"
        layout="naked"
        v-model="value"
    />
    <pre>{{ JSON.stringify(value) }}</pre>
</template>
<script>
import {VanillaInputSelect} from "@vanilla-components";
export default {
  components: {
    VanillaInputSelect
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
