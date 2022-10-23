---
outline: deep
---

# Datetime Picker

A date time picker bootstrap by [VCalendar](https://vcalendar.io/). Styled and aligned with your current theme & styles from vanilla components.
This component is just a wrapper around the original component with a few tweaks to make it work with vanilla components & provide a smoother expirience for daily usage
So expect the same props, slots, events & more.

:::warning
This is NOT an official vanilla components component, a full-fledged date time picker takes a lot of effort, so we have have just bootstrapped this one for now :)
There are plans to port an official datetime picker. But meanwhile enjoy this amazing experience by V-Calendar!

**Note:** Please keep in mind for this case you must include the CSS file. Please check the [theme](#theme-styles)
:::

### Install V-Calendar

Start by installing the [VCalendar](https://vcalendar.io/) for this case we will be using the `@next` branch with our own fork to support type `module` until the original maintainer finishes it, that brings support to vue 3
and will soon be refactored properly to composition API. Please follow the V-Calendar installation guide for more details.

```bash
# Using pnpm
pnpm add @indigit/v-calendar@next
# Using Yarn
yarn add @indigit/v-calendar@next
# Using npm
npm add @indigit/v-calendar@next
```


!!!include(./src/parts/title-preview.md)!!!


<ExampleDatetimePicker />

:::details :surfer: Click to expand the code
<<< @/components/ExampleDatetimePicker.vue
:::

!!!include(./src/parts/title-props.md)!!!

| Prop         | Description               | Accepted Values | Default     |
|:-------------|:--------------------------|:----------------|:------------|
| `modelValue` | The value for the element | `Any`           | `undefined` |
| `options`    | Flatpickr Options         | `Object`        | `undefined` |
| `type`       | Type of input             | `String`        | `'text'`    |


!!!include(./src/parts/title-slots.md)!!!

All the default slots of [VCalendar](https://vcalendar.io/api/v1.0/datepicker.html#scoped-slots) are available normally for usage.
The default slot is pre-filled, please check bellow.

### Slot `default`

This is the default slot of the component, by default a [Vanilla Text Input](/guide/components/input) is used to display the value.
But you are free to use whatever you want for this slot, the slot is also forwarded to the V-Calendar component.

| Attribute   | Description      | Type     |
|:------------|:-----------------|:---------|
| `className` | Classes injected | `String` |


## Theme & Styles

Because you cannot really use the full power of Vanilla Components here and name your classes, a CSS file must be included to match your styles.
While you can do this on your own and use direct the v-calendar css file, we have prepared a small CSS file that you can use to match your theme, the same theme being used
with your Vanilla Components setup, in case you are using Tailwind CSS, you can check the [Tailwind CSS Configuration](/guide/configuration#tailwind-defaults) section for more info.

We leverage the `colors.primary` from TailwindCSS to match you current theme, same with the dark mode via `class`.

Create a file somewhere in your project and name it for ex: `v-calendar.pcss` and add the following content:

:::details 👉 Click here to check the full CSS file
```css
@import 'v-calendar/dist/style.css';

@tailwind components;

.vc-container {

    --indigo-100: theme('colors.primary.100');
    --indigo-200: theme('colors.primary.200');
    --indigo-300: theme('colors.primary.300');
    --indigo-400: theme('colors.primary.400');
    --indigo-500: theme('colors.primary.500');
    --indigo-600: theme('colors.primary.600');
    --indigo-700: theme('colors.primary.700');
    --indigo-800: theme('colors.primary.800');
    --indigo-900: theme('colors.primary.800');

    &.vc-indigo {
        --accent-100: theme('colors.primary.100');
        --accent-200: theme('colors.primary.200');
        --accent-300: theme('colors.primary.300');
        --accent-400: theme('colors.primary.400');
        --accent-500: theme('colors.primary.500');
        --accent-600: theme('colors.primary.600');
        --accent-700: theme('colors.primary.700');
        --accent-800: theme('colors.primary.800');
        --accent-900: theme('colors.primary.800');
    }
}

.dark {
    .vc-container {

        color:  theme('colors.gray.100');
        background-color: theme('colors.gray.900');
        border-color: theme('colors.gray.700');

        select {
            background: theme('colors.gray.700');
            color: theme('colors.gray.100');
            border-color: theme('colors.gray.700')
        }

        select:hover {
            color: theme('colors.gray.400')
        }

        select:focus {
            border-color: var(--accent-500);
            background-color: theme('colors.gray.800')
        }

        .vc-time-picker {
            border-color: theme('colors.gray.700')
        }

        &.vc-time-icon, .vc-time-weekday {
            color: theme('colors.gray.400')
        }

        .vc-time-month, .vc-time-day {
            color: var(--accent-400)
        }

        .vc-time-year {
            color: theme('colors.gray.500')
        }

        .vc-am-pm {
            background: theme('colors.gray.700')
        }

        .vc-am-pm:focus {
            border-color: var(--accent-500)
        }

        .vc-am-pm button {
            color: theme('colors.gray.100')
        }

        .vc-am-pm button:hover {
            color: theme('colors.gray.400')
        }

        .vc-am-pm button:focus {
            border-color: var(--accent-500)
        }

        .vc-am-pm button.active {
            background: var(--accent-500);
            color: var(--white)
        }

        .vc-am-pm button.active:hover {
            background: var(--accent-600)
        }

         .vc-am-pm button.active:focus {
            border-color: var(--accent-500)
        }

         .vc-header {
            color: theme('colors.gray.200')
        }

         .vc-title {
            color: theme('colors.gray.100')
        }

         .vc-weekday {
            color: var(--accent-200)
        }

         .vc-nav-popover-container {
            color: theme('colors.gray.800');
            background-color: var(--white);
            border-color: theme('colors.gray.100')
        }

         .vc-nav-title:hover {
            background-color: theme('colors.gray.200')
        }

         .vc-nav-title:focus {
            border-color: var(--accent-400)
        }

         .vc-nav-arrow:hover {
            background-color: theme('colors.gray.200')
        }

         .vc-nav-arrow:focus {
            border-color: var(--accent-400)
        }

         .vc-nav-item:hover {
            color: theme('colors.gray.900');
            background-color: theme('colors.gray.200');
            box-shadow: none
        }

         .vc-nav-item.is-active {
            color: var(--white);
            background: var(--accent-500)
        }

         .vc-nav-item.is-current {
            color: var(--accent-600);
            border-color: var(--accent-500)
        }

         .vc-nav-item:focus {
            border-color: var(--accent-400)
        }

         .vc-day-content:hover {
            background-color: #7281974d
        }

         .vc-day-content:focus {
            background-color: #72819766
        }

         .vc-day-content.is-disabled {
            color: theme('colors.gray.600')
        }

         .vc-arrow {
            color: var(--white)
        }

         .vc-arrow:hover {
            background: theme('colors.gray.800')
        }

         .vc-arrow:focus {
            border-color: theme('colors.gray.700')
        }

         .vc-day-popover-container {
            color: theme('colors.gray.800');
            background-color: var(--white);
            border-color: theme('colors.gray.100')
        }

         .vc-day-popover-header {
            color: theme('colors.gray.700')
        }
    }
}
```
:::

