# Vanilla Components

A lightweight Vue 3 component library based merging the best components around to enjoy seamless integr

# Quick Start

yarn install && yarn build
cd docs
yarn watch


## Usage

First install the library using your prefered package manager

```bash
yarn add @igerslike/vanilla-components
```

then you can import the available components like so

```vue
import { Button } from '@vanilla-components'
```

## Available commands

Here is a list of all available npm commands.

**Building the library bundles**

```bash
yarn lib:build
```

**Publish the Library**

```bash
yarn lib:publish
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

**Using the Package on Vuepress or Locally**

`yarn link` then on your vuepress `yarn link "@indigit/vanilla-components"`

Or using pnpm
``

** Patching **

https://github.com/ds300/patch-package

```bash
Edit the files in node_modules

npx patch-package @vue/_old_theme
npx patch-package
```
