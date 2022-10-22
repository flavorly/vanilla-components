---
outline: deep
---

# Button

A Native `<button />`  with batteries included for loading state, variants & many more.

!!!include(./src/parts/title-preview.md)!!!

<script setup>
    import ExampleButton from './ExampleButton.vue';
</script>

<ExampleButton />

:::details :surfer: Click to expand the code
<<< @/components/button/ExampleButton.vue
:::


!!!include(./src/parts/title-props.md)!!!

| Prop           | Description                   | Accepted Values | Default    |
|:---------------|:------------------------------|:----------------|:-----------|
| `as`           | Tag to render the button      | `String`        | `'button'` |
| `label`        | Label & text for the button   | `String`        | `'button'` |
| `loading`      | Disable & Sets as loading     | `Boolean`       | `false`    |
| `disabled`     | Disable the button            | `Boolean`       | `false`    |
| `type`         | Type of the button Ex: submit | `String`        | `'button'` |
| `focusOnMount` | Auto-focus on mount           | `Boolean`       | `false`    |


!!!include(./src/parts/title-slots.md)!!!

### Slot `default`

Default slot, overrides everything inside the button, please beware that this will disable the loading and disable states

### Slot `icon`

Appends an icon, allowing an icon to be inserted together with the loading state

### Slot `label`

Label to use inside the button, as you would expect from a normal button

!!!include(./src/parts/title-events.md)!!!

| Event   | Description             | Value     |
|:--------|:------------------------|:----------|
| `click` | When element is clicked | `Boolean` |







