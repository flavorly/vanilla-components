---
outline: deep
---

# Skeleton Loaders

The skeleton loaders are used to display a busy state of your app, and fill the white gaps with a nice animation.

!!!include(./src/parts/title-preview.md)!!!

<ExampleSkeleton />

:::details :surfer: Click to expand the code
<<< @/components/ExampleSkeleton.vue
:::

!!!include(./src/parts/title-props.md)!!!

| Prop    | Description                   | Accepted Values | Default |
|:--------|:------------------------------|:----------------|:--------|
| `count` | Number of elements to render  | `Number`        | `1`     |
| `as`    | Tag or component to render as | `String`        | `div`   |
