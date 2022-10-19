---
outline: deep
---

# Quick start

## Installation

Please install with your favorite package manager.
```bash
# Using pnpm
pnpm add @indigit/vanilla-components
# Using Yarn
yarn add @indigit/vanilla-components
# Using npm
npm install @indigit/vanilla-components
```

Once installed on your project, install also the `peer dependencies`, those are packages that are required for Vanilla Components to work, but they are not bundled with Vanilla Components:

```bash
# Using pnpm
pnpm add @headlessui/vue @popperjs/core flatpickr libphonenumber-js
# Using Yarn
yarn add @headlessui/vue @popperjs/core libphonenumber-js
# Using npm
npm add @headlessui/vue @popperjs/core libphonenumber-js
```


## Install on Vue 3

Now that the package is install you may go further and enable the package on your Vue application entry point.
This setup is only required to register the global & default configuration, no components are registered.

```js{2,6}
import { createApp } from 'vue'
import { Plugin } from '@indigit/vanilla-components'
// Or If you prefer
import { VanillaComponents } from '@indigit/vanilla-components'
const app = createApp()
app.use(VanillaComponents, {})
```

::: warning
Please keep in mind, that by installing the plugin it WON'T register the components globally, you still need to import the components per page-basis or where you need them, this is done by design.
:::

The plugin accepts a `second argument` that could be used to provide your own configuration, this topic is covered fully on the next chapter [Configuration](./configuration)

## Basic Usage
After installed, you may import the components as you need them, if you are not happy with the namings go further and create an alias. You can see the full list of named exports [here](https://github.com/nikuscs/vanilla-components/blob/master/packages/vanilla-components/src/index.ts), that should be always up-to-date.

```vue{2,6}
<script setup lang="ts">
import { Button, Avatar as MyOwnAvatarComponent } from '@indigit/vanilla-components'
</script>

<template>
    <MyOwnAvatarComponent />
    <Button>Continue</Button>
</template>
```

## Types

Typescript types are also exported from the library, in case you need them to type your templates/scripts.

```vue{2}
<script setup lang="ts">
import type { ButtonProps } from '@indigit/vanilla-components'
</script>
```

## Using Tailwind

If you are using Tailwind please ensure your configuration file matches the following:

```js
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
module.exports = {
    // the rest of  your configuration..
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
