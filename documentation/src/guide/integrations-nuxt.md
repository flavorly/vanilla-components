---
outline: deep
---

# Nuxt

Adding Vanilla Components to your Nuxt project is pretty easy, first install the package normally as mentioned on the [Quick Start](/guide/quick-start) page.

## Installation

Get started setting up your nuxt project by following the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/installation)

Create a new folder on your project root called `plugins` and create a new file called `vanilla-components.ts` inside it.

```
├─ your-nuxt-project-root
   ├─ plugins
      ├─ vanilla-components.ts
```

And add the following code to it:

```ts [plugins/vanilla-components.ts]
import { VanillaComponents } from "@flavorly/vanilla-components";

export default defineNuxtPlugin(nuxtApp => {
    // You can also override the default options here
    nuxtApp.vueApp.use(VanillaComponents,{})
})
```

That should be it! You should be up and running with Vanilla Components on your Nuxt project. Please keep in mind that 
because vanilla components default preset ships with tailwind you might see no styles, check the next section to learn how to configure together with tailwind.


## Tailwind CSS Configuration ( Optional )

To get started install the recommended `module` for [Nuxt + Tailwind](https://tailwindcss.nuxtjs.org/getting-started/setup) and follow the regular setup guide
recommended by the package.

Install `@nuxt/tailwindcss` & `@tailwindcss/forms` using your package manager of choice:

::: code-group
```bash [pnpm]
pnpm add -D @nuxtjs/tailwindcss @tailwindcss/forms
```

```bash [Yarn]
yarn add --dev @nuxtjs/tailwindcss @tailwindcss/forms
```

```bash [npm]
npm install --save-dev @nuxtjs/tailwindcss @tailwindcss/forms
```
:::

Create two files, one called `tailwind.config.js` at the root of your project and the other `assets/css/tailwind.css` on your project root.

```
├─ your-nuxt-project-root
   ├─ assets
      ├─ tailwind.css
   ├─ tailwind.config.js
```

Update your tailwind.config.js file:

<<< @/snippets/tailwind.config.js

That should be it! You should have a working tailwind setup with the default Vanilla Components preset.


