# Cards

Cards will bring a nice way to wrap content on your App, supports for actions & different headers styles.

## Properties
| Prop       | Description               | Accepted Values                 | Default     |
| :--------- | :------------------------ | :------------------------------ | :---------- |
| `title`| HTML title for Card     |  `String` | `undefined` |
| `subtitle` | Subtitle for the Card | `String` | `undefined`   |
| `bodyClasses` | Classes to Apply on the body | `String` | `undefined`   |
| `headerClasses` | Classes to Apply on the header | `String` | `undefined`   |
| `footerClasses` | Classes to Apply on the body | `String` | `undefined`   |

## Events
This component doesn't have any events.

## Slots
| Event   | Description               | Parameters    |
| :------ | :------------------------ | :------------ |
| `title` | Fill your own title | `none` |
| `subtitle` | Fill your own subtitle | `none` |
| `actions` | Set the actions for this card | `none` |
| `default` | Default slot for the card body | `none` |
| `footer` | Footer Slot for the card | `none` |

```vue
<template>
  <vanilla-card
      title="im a title"
      subtitle="subtitle"
  >
    <div class="p-5">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </div>
  </vanilla-card>
</template>

<script>
import { VanillaCard } from "@vanilla-components";
export default {
  name: "ExampleButtons",
  components: {
    VanillaCard
  },
}
</script>

```

<wrapper src="elements/cards/demo" />
