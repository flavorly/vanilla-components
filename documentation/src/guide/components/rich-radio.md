---
outline: deep
---

# Rich Radio

The rich radio is intended to be used as a replacement for the standard HTML radio input. It is a more flexible and customizable component that can be used to create a variety of different radio button styles.


<!--@include: ./parts/title-preview.md-->

<ExampleRichRadio />

:::details :surfer: Click to expand the code
<<< @/components/ExampleRichRadio.vue
:::

<!--@include: ./parts/title-props.md-->

| Prop               | Description                              | Type      | Default     |
|:-------------------|:-----------------------------------------|:----------|:------------|
| `modelValue`       | The value for the component              | `Any`     | `undefined` |
| `disabled`         | Enable or disable selection              | `Boolean` | `false`     |
| `options`          | Array of options for the select          | `Array`   | `undefined` |
| `normalizeOptions` | If we should normalize the options       | `Array`   | `undefined` |
| `valueAttribute`   | Value Attribute key to search on options | `String`  | `undefined` |
| `textAttribute`    | Label Attribute key to search on options | `String`  | `undefined` |
| `separated`        | Separates the options                    | `Boolean` | `true`      |
| `radio`            | Uses a radio instead of an icon          | `Boolean` | `true`      |
| `compact`          | Makes the radio list more compact        | `Boolean` | `false`     |


## Options

When using the `options` prop you can pass an array of objects of your choice and use the `valueAttribute` and `textAttribute` props to define which keys to use for the value and text.
This will make it easier to use the component with your own data without worry about the structure.
Internally we will convert the options to what we call `normalizedOptions`, that contains a `value`, `text` & `description`.

If you want instead, you can also pass the `normalizeOptions` prop with the array of normalized options with the following structure :

```js
[
  {
    value: 'batman',
    text: 'Batman',
    description: 'The Dark Knight',
    disabled: false,
  },
]
```

By default, the select component will take the `value` to the `v-model`and the `text` to the display the result label.
You can disable an option by using the `disabled` key.

:::info :bulb: Accessing the raw option
After the option is normalized, it is than passed to the component and everything else will be ignored, but you can still access
the raw option of your data by using `option.raw` in the `option` slot.
:::

<!--@include: ./parts/title-slots.md-->

By default all slots get all the props and configuration from the component, for option slots you always get the `normalizedOption` that contains the raw option. 
Option slots also gets the `index`, `active`, `checked` that are forwarded to all slots.

### Slot `option`

The Rich Radio component doesn't do much itself, the slot option contains all the logic for
manipulating the styles, by default we will provide a `RichRadioOption` component that you can use.
But feel free to create your own component and use it instead. Here is the scope passed to the option.

### Slot `radioIcon`

The slot `radioIcon` is used to replace the default radio icon with your own custom icon.

### Slot `label`

The slot `label` is used to replace the whole label with your own custom label, keep in mind it will also remove the default styling

### Slot `labelText`

The slot `labelText` is used to override the default label text while keeping the default styling, you can use this slot to add images or other labels as a label.

### Slot `description`

The slot `description` is used to override the default description, keep in mind it will also remove the default styling

### Slot `descriptionText`

The slot `descriptionText` is used to override the default description text while keeping the default styling, you can use this slot to add images or other labels as a description.

### Slot `svgIcon`

The slot `svgIcon` is used to override the default svg icon when the option is checked.

<!--@include: ./parts/default-slots.md-->


| Attribute       | Description                                | Type              |
|:----------------|:-------------------------------------------|:------------------|
| `option`        | The actual option on the loop              | `Object`, `Array` |
| `active`        | If the option is currently active/focused  | `Boolean`         |
| `checked`       | If the option is currently checked/toggled | `Boolean`         |
| `option-index`  | The index/position for the option          | `Number`          |
| `total-options` | Total number of options                    | `Number`          |
| `separated`     | If its separated                           | `Boolean`         |
| `compact`       | If its compact                             | `Boolean`         |
| `variant`       | The variant / state of the component       | `String`          |
| `disabled`      | If the option is disabled                  | `Boolean`         |


<!--@include: ./parts/title-events.md-->

| Event   | Description             | Value     |
|:--------|:------------------------|:----------|
<!--@include: ./parts/events-model-value.md-->


## Rich Radio Option

As stated above, the rich select component doesn't do much itself, the option component is where most of the configuration & styling goes into place.
The props for the rich radio option are obviously the same as provided as a scope for the Slot Option.


