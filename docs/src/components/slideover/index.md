---
outline: deep
---

# Slideover

A dialog with a slideover behaviour backed by HeadlessUI dialogs :smile:

!!!include(./src/_includes/title-preview.md)!!!

<wrapper src="components/slideover/demo" />

!!!include(./src/_includes/title-snippet.md)!!!

<<< @/components/slideover/ExampleSlideover.vue

!!!include(./src/_includes/title-props.md)!!!

| Prop          | Description                        | Accepted Values       | Default     |
|:--------------|:-----------------------------------|:----------------------|:------------|
| `as`          | Tag to render the button           | `String`              | `'button'`  |
| `title`       | Title for the card                 | `[String, undefined]` | `undefined` |
| `subtitle`    | Subtitle for the card              | `[String, undefined]` | `undefined` |
| `bodyDivided` | Divide the items insides card body | `Boolean`             | `false`     |


!!!include(./src/_includes/title-slots.md)!!!

### Slot `default`

Default slot for the card body







