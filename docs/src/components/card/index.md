---
outline: deep
---

# Card

A beautiful card to use on your application to display resource, forms or anything on your imagination :smile:

!!!include(./src/_includes/title-preview.md)!!!

<wrapper src="components/card/demo" />

!!!include(./src/_includes/title-snippet.md)!!!

<<< @/components/card/ExampleCard.vue

!!!include(./src/_includes/title-props.md)!!!

| Prop          | Description                        | Accepted Values       | Default     |
|:--------------|:-----------------------------------|:----------------------|:------------|
| `as`          | Tag to render the button           | `String`              | `'button'`  |
| `title`       | Title for the card                 | `[String, undefined]` | `undefined` |
| `subtitle`    | Subtitle for the card              | `[String, undefined]` | `undefined` |
| `bodyDivided` | Divide the items insides card body | `Boolean`             | `false`     |


!!!include(./src/_includes/title-slots.md)!!!

### Slot `title`

Slot for the title of the card

### Slot `subtitle`

Slot for the subtitle of the card

### Slot `actions`

Slot for the action's panel on the top-right side of the card

### Slot `default`

Default slot for the card body

### Slot `footer`

Slot for the footer of the card

### Slot `footerActions`

Alternative Slot for the footer of the card, supporting buttons styled grid by default aligned to right







