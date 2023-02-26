---
outline: deep
---

# Quick start

## Installation

Please install it with your favorite package manager.

::: code-group
```bash [pnpm]
pnpm add @flavorly/vanilla-components
```

```bash [Yarn]
yarn add @flavorly/vanilla-components
```

```bash [npm]
npm install @flavorly/vanilla-components
```
:::

Once installed on your project, install also the `peer dependencies`, those are packages that are required for Vanilla Components to work, but they are not bundled with Vanilla Components:


::: code-group
```bash [pnpm]
pnpm add @headlessui/vue @popperjs/core libphonenumber-js
```

```bash [Yarn]
yarn add @headlessui/vue @popperjs/core libphonenumber-js
```

```bash [npm]
npm add @headlessui/vue @popperjs/core libphonenumber-js
```
:::



## Install on Vue 3

Now that the package is install you may go further and enable the package on your Vue application entry point.
This setup is only required to register the global & default configuration, no components are registered.

```js{2,6}
import { createApp } from 'vue'
import { Plugin } from '@flavorly/vanilla-components'
// Or If you prefer
import { VanillaComponents } from '@flavorly/vanilla-components'
const app = createApp()
app.use(VanillaComponents)
```

:::warning
Please keep in mind, that installing the plugin WON'T register the components globally, you still need to import the components per page basis or where you need them, this is done by design.
:::

The plugin accepts a `second argument` that could be used to provide your configuration, this topic is covered fully in the next chapter [Configuration](./configuration)

## Basic Usage

After installation, you may import the components as you need them, if you are not happy with the namings go further and create an alias. You can see the full list of named exports [here](https://github.com/flavorly/vanilla-components/blob/master/packages/vanilla-components/src/index.ts), that should be always up-to-date.

```vue
<script setup lang="ts">
import { Button, Avatar } from '@flavorly/vanilla-components' // [!code focus:1]
</script>

<template>
    <Avatar /> // [!code focus:1]
    <Button>Continue</Button>
</template>
```

## Typescript

Typescript types are also exported from the library, in case you need them to type your templates/scripts.

```vue
<script setup lang="ts">
import type { ButtonProps } from '@flavorly/vanilla-components'  // [!code focus:1]
</script>
```

## Using Tailwind

If you are using Tailwind please ensure your configuration file matches the following:

<<< @/snippets/tailwind.config.js
