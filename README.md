# Vanilla Components

A lightweight Vue 3 component library based on VariantJS & Headlessui + Vanilla Components


## Usage

First install the library using your prefered package manager

```bash
yarn add @igerslike/vanilla-components
```

then you can import the available components like so

```vue
import { Button } from '@igerslike/vanilla-components'
```

## Available commands

Here is a list of all available npm commands.

**Starting the dev environment**
We use Vue Press to hold our component documentation and examples

```bash
yarn dev
```

**Building the documentation**

```bash
yarn build
```

**Serving the documentation**

```bash
yarn serve
```

**Building the library bundles**

```bash
yarn build:library
```

**Analyzing bundle sizes with [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)**

```bash
yarn analyze
```

**Lint all files**

```bash
yarn lint
```

**Format all files**
```bash
yarn format
```

**FAQS**

**TO CHECK**

[] - useInjectsConfiguration
[] - useInjectsClassesList
[x] - Create index file for components
[x] - Check when variant is error it should fallback to original variant and not the default one.
[ ] - Check Disabled States in all components

```
https://github.com/ulissesferreira/moon
https://codybontecou.com/tailwindcss-with-vitepress.html
https://github.com/ky-is/vitepress-starter-tailwind/blob/main/docs/.vitepress/theme/tailwind.postcss
https://vitepress-tailwind-clone.netlify.app/docs/browser-support.html
```
