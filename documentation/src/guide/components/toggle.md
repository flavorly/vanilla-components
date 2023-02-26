---
outline: deep
---

# Toggle

A toggle is a switch that can be turned on or off. I can be used to change settings, toggle options, and may more.

<!--@include: ../../parts/title-preview.md-->

<ExampleToggle />

:::details :surfer: Click to expand the code
<<< @/components/ExampleToggle.vue
:::

<!--@include: ../../parts/title-props.md-->

| Prop             | Description                | Accepted Values                                                 | Default     |
|:-----------------|:---------------------------|:----------------------------------------------------------------|:------------|
| `modelValue`     | The value for the element  | `Any`                                                           | `undefined` |
| `checked`        | Default state for toggle   | `Boolean`                                                       | `false`     |
| `value`          | Initial value              | `[Boolean,Any]`                                                 | `false'`    |
| `checkedValue`   | Checked Value              | `[Boolean,Any]`                                                 | `true'`     |
| `uncheckedValue` | Un-checked Value           | `[Boolean,Any]`                                                 | `false'`    |
| `align`          | Position of the toggle     | `['left-top', 'left-center', 'left-bottom','right-bottom', ..]` | `left-top'` |
| `icon`           | If we should show the icon | `Boolean`                                                       | `true`      |


<!--@include: ../../parts/title-slots.md-->


### Slot `unchecked`

Slot to override the icon for the unchecked state

### Slot `checked`

Slot to override the icon for the checked state

### Slot `default`

The default slot is used to display the label of the toggle, but you can be creative to do whatever you want.


| Attribute   | Description               | Type                         |
|:------------|:--------------------------|:-----------------------------|
<!--@include: ../../parts/slots-default-binds.md-->

<!--@include: ../../parts/slots-feedback-errors.md-->

<!--@include: ../../parts/title-events.md-->

| Event   | Description             | Value     |
|:--------|:------------------------|:----------|
<!--@include: ../../parts/events-model-value.md-->
| `click` | When element is clicked | `ClickEvent` |


## Toggle Groups

A toggle group is a group of checkboxes, it's a wrapper for multiple checkboxes, it's a way to group checkboxes together.
A nice use-case for this, is whenever you want to select multiple items at once, like a list of items.


<ExampleToggleGroup />

:::details :surfer: Click to expand the code
<<< @/components/ExampleToggleGroup.vue
:::

## Toggle Group Props :inbox_tray:

Props available for this component extending the default variant & global props.

| Prop               | Description                              | Accepted Values | Default     |
|:-------------------|:-----------------------------------------|:----------------|:------------|
| `modelValue`       | A v-model for the elements               | `Array`         | `undefined` |
| `options`          | Array of options for the select          | `Array`         | `undefined` |
| `normalizeOptions` | If we should normalize the options       | `Array`         | `undefined` |
| `valueAttribute`   | Value Attribute key to search on options | `String`        | `undefined` |
| `textAttribute`    | Label Attribute key to search on options | `String`        | `undefined` |

### Toggle Group Options

The options for the toggle group, works exactly the same way as the options for [RichSelect](/guide/components/rich-select#options).
Passing options without any structure defined, will require you to fill the `valueAttribute` and `textAttribute` props so we can grab them from your options

Here is a small example of normalized options:

```js
[
    {
    value: 'batman',
    text: 'Batman',
    description: 'The Dark Knight',
    },
    {
        value: 'robin',
        text: 'Robin',
        description: 'The Dark Knight\'s sidekick',
    },
]
```
