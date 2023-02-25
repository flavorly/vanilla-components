---
outline: deep
---

# Configuration

## Structure

Components contain three major keys that can be set: `fixedClasses`, `classes`, `variants` & `props`, Below we will explain what each of them means and what's their behavior, as they represent the core concept:

- **`fixedClasses`** - List of classes that are always persisted, even if the variant changes. This is useful in case you want to change the border color but still for example keep the same paddings & other relevant styles.
- **`classes`** - This contains the base classes for the "default" layout of the component.
- **`variants`** - This is an object with your own variant, each variant contains its own `classes` & `props`
- **`props`** - This will provide/override the default props for this component, so they are injected as you need.

With this little system, you can imagine how flexible this can be, the limit is your imagination! We will get deeper into this Below. You can see the demo of the **Input** config [here](https://github.com/flavorly/vanilla-components/blob/0c8308bcfb2be5c59d6b3dbb9488157a6a1f95d4/packages/vanilla-components/src/components/input/config.ts#L35)

:::info Shared Props on Vanilla Components
To check the full list of the available properties for all components please check the [props section](./props)
:::

## Components

The library comes out of the box configured to be used with [Tailwind](https://tailwindcss.com), you are free to change this configuration and provide your own when installing the plugin. The configuration keys can be found [here](https://github.com/flavorly/vanilla-components/blob/0c8308bcfb2be5c59d6b3dbb9488157a6a1f95d4/packages/vanilla-components/src/configuration.ts#L9), you can even include configuration for your components and ***leverage the configuration system*** for your components

Here is a small demo overriding the `Input` component:

```js
import { createApp } from 'vue'
import { Plugin } from '@flavorly/vanilla-components' // [!code  focus]:1]
const app = createApp()

app.use(VanillaComponents, {
    Input: { // [!code  focus]:12]
        fixedClasses: {
          input: 'm-5 shadow-xl',
        },
        classes: {
          input: 'bg-purple-100 border-pruple-100',
          wrapper: 'relative-custom',
        },
        props: {
          placeholder: 'Please write something here',
        }
  },
})
```

Please also note that when you override, you will lose the default styling for this component, which means you will have to configure this component on your own. You can find our presets on the official GitHub.

## Default Configuration

You can check the default and full configuration here : [full Configuration](https://github.com/flavorly/vanilla-components/blob/master/packages/documentation/src/presets/all.json)
Where it also includes the configuration file separated for each component [here](https://github.com/flavorly/vanilla-components/blob/master/packages/documentation/src/presets)

Here is a demo of the Input Component Configuration file:

<<< @/presets/Input.json#snippet

## Inline Configuration

You are not limited to setting a configuration on a file and loading it, even though we recommend doing it, you are also able to define `classes`, `fixedClasses` & `variants` directly to the component. We will cover more of this in the [variants](./variants) section.

```vue
<template>
    <Button
        :variants="{ // [!code  focus]:14]
            orange: {
                classes: {
                    foo: 'bar'
                }
            }
        }"
        :classes="{
            foo: 'baz'
        }"
        :fixed-classes="{
            foo: 'fixed-baz'
        }"
        variant="orange"
    />
</template>
```

## Override Props Values

As mentioned before you may also override the props default values from the components using the variants & other settings, just keep in mind to always use valid types, as this could bring unwanted behaviors.

```ts
import { createApp } from 'vue'
import { Plugin } from '@flavorly/vanilla-components'
const app = createApp()

app.use(VanillaComponents, {
    Input: { 
        props: { // [!code  focus]:4]
          // Here we are expecting a string
          placeholder: true,
        }
    },
    Dialog: {
        props: {// [!code  focus]:4]
          // Here we are expecting a boolean, but we getting a string! :(
          closeOnLeaving: 'yes',
        }
    },
})
```

## Tailwind Defaults

Note on the default Primary Color for Tailwind, the color used by default is called **primary**, which relies also on `@tailwindcss/forms` so please extend your tailwind.config.js to have the primary color as you wish.

Here is a demo tailwind configuration:


```js
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
module.exports = {
    // the rest of  your configuration.. //[!vp focus:15]
    content: [
        "./resources/**/*.{js,ts,jsx,tsx,vue,php}",
        "./node_modules/@flavorly/vanilla-components/dist/components/**/*.{ts,vue}",
    ],
    theme: {
        colors: {
            primary: colors.indigo, // alias "primary" to "indigo"
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/forms'),
    ],
}
```

That's it! With this in mind, you are free to start being creative and create your own thing. If you want to style your components please have a look under [Advanced Configuration](./advanced-configuration)

