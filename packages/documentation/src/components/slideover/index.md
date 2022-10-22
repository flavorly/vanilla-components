---
outline: deep
---

# Slideover

A dialog with a slideover behaviour backed by HeadlessUI dialogs :smile:

!!!include(./src/parts/title-preview.md)!!!

<script setup>
    import ExampleSlideover from './ExampleSlideover.vue';
</script>

<ExampleSlideover />

:::details :surfer: Click to expand the code
<<< @/components/slideover/ExampleSlideover.vue
:::

!!!include(./src/parts/title-props.md)!!!

| Prop          | Description                        | Accepted Values       | Default     |
|:--------------|:-----------------------------------|:----------------------|:------------|
| `as`          | Tag to render the button           | `String`              | `'button'`  |
| `title`       | Title for the card                 | `[String, undefined]` | `undefined` |
| `subtitle`    | Subtitle for the card              | `[String, undefined]` | `undefined` |
| `bodyDivided` | Divide the items insides card body | `Boolean`             | `false`     |


!!!include(./src/parts/title-slots.md)!!!

### Slot `default`

Default slot for the card body







