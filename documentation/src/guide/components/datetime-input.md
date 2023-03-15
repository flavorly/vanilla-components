---
outline: deep
---

# Datetime Picker

A date time picker bootstrap by [VCalendar](https://vcalendar.io/). Styled and aligned with your current theme & styles from vanilla components.
This component is just a wrapper around the original component with a few tweaks to make it work with vanilla components & provide a smoother experience for daily usage
So expect the same props, slots, events & more.

:::warning
This is NOT an official vanilla components component, a full-fledged date time picker takes a lot of effort, so we have just bootstrapped this one for now :)
There are plans to port an official datetime picker. But meanwhile enjoy this amazing experience by V-Calendar!

**Note:** Please keep in mind for this case you must include the CSS file. Please check the [theme](#theme-styles)
:::

### Install V-Calendar

Start by installing the [VCalendar](https://vcalendar.io/) for this case we will be using the `@next` branch as it is the latest version and supports vue 3.


::: code-group
```bash [pnpm]
pnpm add v-calendar@next
```

```bash [Yarn]
yarn add v-calendar@next
```

```bash [npm]
npm install v-calendar@next
```
:::

## Tailwind, Theme & Style

Because you cannot really use the full power of Vanilla Components here and name your classes, a CSS file must be included to match your styles.
While you can do this on your own and use direct the v-calendar css file, we have prepared a small CSS file that you can use to match your theme, the same theme being used
with your Vanilla Components setup, in case you are using Tailwind CSS, you can check the [Tailwind CSS Configuration](/guide/configuration#tailwind-defaults) section for more info.

We leverage the `colors.primary` from TailwindCSS to match you current theme, same with the dark mode via `class`.

Create a file in your project and name it for ex: `v-calendar.pcss` or `v-calendar.css` and add the following content assuming you are using `post-css` & `postcss-nesting`:

```css
/** Ex: styles/v-calendar.css */
@import 'v-calendar/dist/style.css';

.vc-base-select select{
    @apply border-0;
}

:root{
    --vc-color: theme('colors.gray.500');
    --vc-white: #ffffff;
    --vc-black: #000000;
    --vc-gray-50: theme('colors.gray.50');
    --vc-gray-100: theme('colors.gray.100');
    --vc-gray-200: theme('colors.gray.200');
    --vc-gray-300: theme('colors.gray.300');
    --vc-gray-400: theme('colors.gray.400');
    --vc-gray-500: theme('colors.gray.500');
    --vc-gray-600: theme('colors.gray.600');
    --vc-gray-700: theme('colors.gray.700');
    --vc-gray-800: theme('colors.gray.800');
    --vc-gray-900: theme('colors.gray.900');
}

.vc-indigo {
    --vc-color: theme('colors.gray.500');
    --vc-accent-50: theme('colors.primary.50');
    --vc-accent-100: theme('colors.primary.100');
    --vc-accent-200: theme('colors.primary.200');
    --vc-accent-300: theme('colors.primary.300');
    --vc-accent-400: theme('colors.primary.400');
    --vc-accent-500: theme('colors.primary.500');
    --vc-accent-600: theme('colors.primary.600');
    --vc-accent-700: theme('colors.primary.700');
    --vc-accent-800: theme('colors.primary.800');
    --vc-accent-900: theme('colors.primary.900');
}
```

<!--@include: ../../parts/title-preview.md-->


<ExampleDatetimePicker />

:::details :surfer: Click to expand the code
<<< @/components/ExampleDatetimePicker.vue
:::

<!--@include: ../../parts/title-props.md-->

| Prop         | Description               | Accepted Values | Default     |
|:-------------|:--------------------------|:----------------|:------------|
| `modelValue` | The value for the element | `Any`           | `undefined` |
| `options`    | Flatpickr Options         | `Object`        | `undefined` |
| `type`       | Type of input             | `String`        | `'text'`    |


<!--@include: ../../parts/title-slots.md-->

All the default slots of [VCalendar](https://vcalendar.io/calendar/api.html) are available normally for usage.
The default slot is pre-filled, please check Below.

### Slot `default`

This is the default slot of the component, by default a [Vanilla Text Input](/guide/components/input) is used to display the value.
But you are free to use whatever you want for this slot, the slot is also forwarded to the V-Calendar component.

| Attribute   | Description      | Type     |
|:------------|:-----------------|:---------|
| `className` | Classes injected | `String` |


