<p align="center">
<img src="/packages/documentation/src/public/symbol-gradient.svg" height="150">
</p>


<h1 align="center">
Vanilla Components
</h1>

<p align="center">
A lightweight, flexible & customizable ui library for Vue 3
<p>
  
<p align="center">
  <a href="https://vanilla-components.com">Documentation</a> | <a href="https://vanilla-components.com/guide/">Getting Started</a> | <a href="https://vanilla-components.com/guide/#examples">Examples</a> | <a href="https://vanilla-components.com/guide/why">Why Vanilla Components?</a>
</p>

## Main Features ✨

- 🧪 **DX Focused** - Write less code & build faster
- 🛠 **Totally Configurable** - All components & props are fully customizable via a simple configuration file
- 🍃 **Tailwind First** - Comes with a sane styling using Tailwind CSS Defaults
- 🦾 **Vue + TypeScript** - Vue 3 setup + Typescript
- **Vue 3 Ready** - Vue 3
- 🌳 **Tree Shakable** - Import only the components that you need without worry about the size
- **0 ( ZERO ) css included** - Everything is configurable, means there is no CSS's to include at all
- 🌜 **Dark/White** - Pixel Perfect design with Dark & White mode included

# Installation

Get started by installing the peer dependencies than, move on installing the package

```bash
pnpm add @headlessui/vue@^1.5.0 @popperjs/core@^2.11.2 flatpickr@^4.6.9 libphonenumber-js@^1.9.49 
pnpm add @indigit/vanilla-components
```

## Usage

Import the components as needed with the following

```vue
import { Button } from '@vanilla-components'
```

## Local & Documentation

For preview & Local testing please run the following on the root of the project.
After the commands you should have a local vite server up & running.

```bash
pnpm install
pnpm build
pnpm docs:dev
```

## Starting Fresh

To start fresh, simply run the following commands

```bash
pnpm clean
pnpm install
pnpm build
pnpm docs:dev
```

## Lunr ( Algolia Alternative )

Lunr replaces the default Vitepress Algolia Search
To get the project index correctly do the following:

```
pnpm lunr:start
pnpm build ( optional if already built )
pnpm lunr:index
```
