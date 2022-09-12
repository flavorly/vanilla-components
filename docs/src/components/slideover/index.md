---
outline: deep
---

# Slideover

A dialog with a slideover behaviour backed by HeadlessUI dialogs :smile:

!!!include(./src/parts/title-preview.md)!!!

<wrapper src="components/slideover/demo" />

!!!include(./src/parts/title-snippet.md)!!!

<<< @/components/slideover/ExampleSlideover.vue

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







